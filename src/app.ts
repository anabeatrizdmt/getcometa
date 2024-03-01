import express from 'express';
import ordersRoutes from './routes/ordersRoutes';
import beersRoutes from './routes/beersRoutes';

const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use('/orders', ordersRoutes);
  app.use('/beers', beersRoutes);

  return app;
};

export { createApp };