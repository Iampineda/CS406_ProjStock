import * as tf from '@tensorflow/tfjs';

let model;

// Train the model once when first used
async function trainModel() {
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  // Training data: y = 2x + 1
  const xs = tf.tensor2d([0, 1, 2, 3, 4, 5], [6, 1]);
  const ys = tf.tensor2d([1, 3, 5, 7, 9, 11], [6, 1]);

  await model.fit(xs, ys, { epochs: 50 });
}

// Predict y for a given x
export async function predictY(x) {
  if (!model) await trainModel();
  const input = tf.tensor2d([Number(x)], [1, 1]);
  const output = model.predict(input);
  return output.dataSync()[0]; // get the single prediction number
}
