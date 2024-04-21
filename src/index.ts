import cors from "@koa/cors";
import { config as dotenv } from "dotenv";
import Koa from "koa";
import session from "koa-session";
import http from "node:http";
import "reflect-metadata";
import config from "../config.json" assert { type: "json" };
import { AppDataSource } from "./data-source.js";
import { attachRouters } from "./router.js";

dotenv({
  path: ".env.local",
});

await AppDataSource.initialize();

const app = new Koa();
app.use(
  cors({
    origin: "*",
  }),
);

app.use(session(app));
app.keys = config.session.keys;

attachRouters(app);

http
  .createServer(app.callback())
  .listen(process.env.HTTP_PORT || config.defaults.HTTP_PORT);
