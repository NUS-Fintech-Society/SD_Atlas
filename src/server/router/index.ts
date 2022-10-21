// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { protectedExampleRouter } from './protected-example-router'
import { profileRouter } from './member_profile'
import {dashRouter} from "./member_dash"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', protectedExampleRouter)
  .merge('member-profile.', profileRouter)
  .merge("memberdash.", dashRouter);

// export type definition of API
export type AppRouter = typeof appRouter

