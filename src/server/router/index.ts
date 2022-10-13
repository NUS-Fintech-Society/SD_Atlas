// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import {dashRouter} from "./member_dash"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("memberdash.", dashRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
