// src/server/router/index.ts
<<<<<<< HEAD
import { createRouter } from "./context";
import superjson from "superjson";
import {dashRouter} from "./member_dash"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("memberdash.", dashRouter);
=======
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { protectedExampleRouter } from './protected-example-router'
import { profileRouter } from './member_profile'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', protectedExampleRouter)
  .merge('member-profile.', profileRouter)
>>>>>>> dev

// export type definition of API
export type AppRouter = typeof appRouter
