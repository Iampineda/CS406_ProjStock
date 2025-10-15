import express from 'express';
import predictRouter from './routes/predict.route.js';

const app = express();
const PORT = 3000;

app.use('/api/predict', predictRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
