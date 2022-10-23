// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { protectedExampleRouter } from './protected-example-router'
import dashboardRouter from './admin'
import { profileRouter } from './member_profile'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', protectedExampleRouter)
  .merge('admin.', dashboardRouter)
  .merge('member-profile.', profileRouter)

// export type definition of API
export type AppRouter = typeof appRouter
