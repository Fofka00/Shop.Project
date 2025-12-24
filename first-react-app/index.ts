import express, { Express } from "express";
import path from "path";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import { productsRouter } from "./src/api/products-api";
import { commentsRouter } from "./src/api/comments-api";

let app: Express;
export let connection: Connection;

export default async (): Promise<Express> => {
  app = initServer();
  connection = await initDataBase();

  app.use("/api/products", productsRouter);
  app.use("/api/comments", commentsRouter);

  const clientBuildPath = path.join(__dirname, "shop-client", "build");

  app.use(express.static(clientBuildPath));

  app.get("/", (_, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });

  return app;
};