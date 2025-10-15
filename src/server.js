import express from 'express';
import predictRouter from './routes/predict.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('406_project is running 🚀');
});

app.use('/api/predict', predictRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
