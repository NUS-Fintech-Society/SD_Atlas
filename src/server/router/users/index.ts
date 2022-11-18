import { createProtectedRouter } from '../context'
import { TRPCError } from '@trpc/server'

const UserRouter = createProtectedRouter()
  .query('getUserProjects', {
    resolve: async ({ ctx }) => {
      try {
        const data = await ctx.prisma.user.findUnique({
          where: { id: ctx.session.user.id },
          include: {
            projects: {
              select: {
                project_id: true,
                name: true,
                team_lead: true,
              },
            },
          },
        })

        return data
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (e as Error).message,
        })
      }
    },
  })
  .query('getUserInfo', {
    async resolve({ ctx }) {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session.user.id },
          select: {
            name: true,
            discord: true,
            telegram: true,
            email: true,
            personal_email: true,
            major: true,
            batch: true,
            linkedin: true,
          },
        })

        if (!user)
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })

        return user
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (e as Error).message,
        })
      }
    },
  })

export default UserRouter
