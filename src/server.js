import express from 'express';
import predictRouter from './routes/predict.route.js';

const app = express();
const PORT = 3000;

// Mount the predict router at /api/predict
app.use('/api/predict', predictRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
