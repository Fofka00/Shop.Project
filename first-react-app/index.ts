import express, { Express } from "express";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import { productsRouter } from "./src/api/products-api";

let app: Express;
export let connection: Connection;
export type CommentCreatePayload = {};

export default async (): Promise<Express> => {
  app = initServer();
  connection = await initDataBase();


  app.use("/api/products", productsRouter);

  app.use("/", (_, res) => {
    res.send("React App");
  });

  return app;
};