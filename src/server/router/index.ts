// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'
import { profileRouter } from './member_profile'
import {dashRouter} from "./member_dash"
import dashboardRouter from './admin/dashboard/dashboard'
import AnnouncementRouter from './admin/announcement'
import UserRouter from './users'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('member-profile.', profileRouter)
  .merge("memberdash.", dashRouter);
  .merge('member.', dashboardRouter)
  .merge('user.', UserRouter)
  .merge('announcement.', AnnouncementRouter)
// export type definition of API
export type AppRouter = typeof appRouter

