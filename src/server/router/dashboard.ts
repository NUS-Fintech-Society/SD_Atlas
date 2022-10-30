import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { hash } from 'bcryptjs'

const dashboardRouter = createRouter().mutation('create-user', {
  input: z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
    level: z.string(),
  }),
  output: z.object({
    success: z.boolean(),
    message: z.string()
  }),
  resolve: async ({ ctx, input }) => {
    // If there is no contex or session, there is an issue.
    if (!ctx || !ctx.session) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message:
          'Something went wrong. Please contact the software developer team immediately',
      })
    }

    // If the user is just a normal member, he should not be able to create a new account
    if (ctx.session.level === 'member') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User is not authorized to create a new account',
      })
    }

    const { email, id, password, level } = input

    try {
      const hashedPassword = await hash(password, 10)

      const foundUser = await ctx.prisma.user.findUnique({where: { email }})
      if (foundUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists"
        })
      }

      await ctx.prisma.user.create({
        data: {
          email,
          hashedPassword,
          level,
          id,
        },
      })

      return {
        success: true,
        message: "User created successfully"
      }
    } catch (e) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: (e as Error).message,
      })
    }
  },
})

export default dashboardRouter
