import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { compare, hash } from 'bcryptjs'

const dashboardRouter = createRouter()
  .mutation('create-user', {
    input: z.object({
      id: z.string(),
      email: z.string(),
      password: z.string(),
      level: z.string(),
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

        const foundUser = await ctx.prisma.user.findUnique({ where: { email } })
        if (foundUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exists',
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
      } catch (e) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: (e as Error).message,
        })
      }
    },
  })
  .mutation('change-password', {
    input: z.object({
      current: z.string(),
      updated: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        const { current, updated } = input

        if (!ctx || !ctx.session || !ctx.session.user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Please contact the software developer team in charge',
          })
        }

        const foundUser = await ctx.prisma.user.findUnique({
          where: { email: ctx.session.user.email as string },
        })

        if (!foundUser) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Account does not exist.',
          })
        }

        const success = await compare(current, foundUser.hashedPassword)
        if (!success) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Incorrect password',
          })
        }

        const hashedPassword = await hash(updated, 10)

        await ctx.prisma.user.update({
          where: {
            email: ctx.session.user.email as string,
          },
          data: {
            hashedPassword,
          },
        })
      } catch (e) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: (e as Error).message,
        })
      }
    },
  })

export default dashboardRouter
