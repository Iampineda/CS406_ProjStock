import express from "express";
import yf from "yahoo-finance2";
import * as tf from "@tensorflow/tfjs-node";
import "dotenv/config";

const app = express();
app.use(express.json());

app.get("/predict", async (req, res) => {
  const symbol = (req.query.symbol || "SPY").toString().toUpperCase();
  const rows = await yf.historical(symbol, { period1: "2023-01-01" });
  // super tiny example feature: last N closes normalized
  const closes = rows.map(r => r.close).slice(-60);
  if (closes.length < 30) return res.status(400).json({ error: "Not enough data" });

  // toy model (load if exists, else build)
  let model;
  try { model = await tf.loadLayersModel("file://models/model.json"); }
  catch {
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 16, inputShape: [30], activation: "relu" }));
    model.add(tf.layers.dense({ units: 3, activation: "softmax" })); // up/down/neutral
    model.compile({ optimizer: "adam", loss: "categoricalCrossentropy" });
  }

  // create a trivial input: last 30 closes normalized
  const last30 = closes.slice(-30);
  const mean = last30.reduce((a,b)=>a+b,0)/last30.length;
  const std = Math.sqrt(last30.reduce((s,x)=>s+(x-mean)**2,0)/last30.length) || 1;
  const x = tf.tensor2d([ last30.map(v => (v-mean)/std) ]);

  const probs = model.predict(x).dataSync();
  const labels = ["down","neutral","up"];
  const idx = probs.indexOf(Math.max(...probs));
  res.json({ symbol, prediction: labels[idx], confidence: Number(probs[idx].toFixed(2)) });
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
