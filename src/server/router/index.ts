// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'
import { profileRouter } from './member_profile'
import dashboardRouter from './dashboard'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('member-profile.', profileRouter)
  .merge('member.', dashboardRouter)

// export type definition of API
export type AppRouter = typeof appRouter
