import * as tf from '@tensorflow/tfjs';

let model;

async function trainModel() {
  // Create a simple model
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  // Prepare the model for training
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  // Training data for y = 2x - 1
  const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
  const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

  // Train the model using the data
  await model.fit(xs, ys, { epochs: 250 });
}

export async function predictY(x) {
  if (!model) {
    await trainModel();
  }
  const input = tf.tensor2d([Number(x)], [1, 1]);
  const output = model.predict(input);
  const y = output.dataSync()[0];
  return y;
}
