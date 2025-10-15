import * as tf from '@tensorflow/tfjs';

let _isTrained = false;
let _model;

/** Simple 1-layer linear regression: y ≈ m*x + b */
function buildModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.sgd(0.1)
  });
  return model;
}

export async function ensureTrained() {
  if (_isTrained) return;

  _model = buildModel();

  // Toy data for y = 2x - 1
  const xs = tf.tensor2d([0, 1, 2, 3, 4, 5], [6, 1]);
  const ys = tf.tensor2d([-1, 1, 3, 5, 7, 9], [6, 1]);

  await _model.fit(xs, ys, { epochs: 150, verbose: 0 });
  _isTrained = true;

  xs.dispose();
  ys.dispose();
}

export async function predictY(x) {
  await ensureTrained();
  const input = tf.tensor2d([Number(x)], [1, 1]);
  const output = _model.predict(input);
  const [y] = Array.from(output.dataSync());
  input.dispose();
  // output is a Tensor; dispose to avoid leaks
  if (output.dispose) output.dispose();
  return y;
}
