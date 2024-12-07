import express from 'express';
import { cromulonAgent } from './agent';

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start both Express and the Cromulon agent
async function start() {
  await cromulonAgent.start();
  app.listen(port, () => {
    console.log(`🪙 Cromulon server running on port ${port}`);
  });
}

start(); 