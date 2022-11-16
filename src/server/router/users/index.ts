import { createProtectedRouter } from '../context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

const UserRouter = createProtectedRouter().query('getProjects', {
  resolve: async ({ ctx }) => {
    try {
      const data = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        include: { projects: true },
      })

      console.log(data)
      return data
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: (e as Error).message,
      })
    }
  },
})

export default UserRouter
