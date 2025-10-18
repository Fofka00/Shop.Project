import express, { Express } from "express";


export function initServer(): Express {
  const app = express();
  

  const jsonMiddleware = express.json();
  app.use(jsonMiddleware);

  return app;
}