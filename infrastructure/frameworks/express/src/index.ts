import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/hello', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
