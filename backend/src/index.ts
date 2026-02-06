import express, { Application, Request, Response } from 'express';
import routes from './routes/index';
import { config } from 'dotenv';
import { connectWithRetry } from '../database/config/connection';
config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectWithRetry().catch(err => {
  console.error('Failed to connect to the database:', err);
});

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Focusly Backend - Task Manager API' });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
