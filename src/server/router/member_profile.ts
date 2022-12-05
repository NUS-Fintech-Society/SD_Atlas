import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from './context'

export const profileRouter = createRouter()
  .query('getMemberProfile', {
    input: z.string(),
    async resolve({ input, ctx }) {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: input,
          },
          select: {
            name: true,
            gender: true,
            batch: true,
            year: true,
            faculty: true,
            image: true,
            telegram: true,
            discord: true,
            email: true,
            personal_email: true,
            hobbies: true,
            department: true,
            roles: true,
            major: true,
          },
        })

        if (!user) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'No user found',
          })
        }

        if (!user.department) return { user }

        const projects = await ctx.prisma.departments.findUnique({
          where: {
            department_id: user.department,
          },
          include: {
            projects: true,
          },
        })

        return { user, projects }
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (e as Error).message,
        })
      }
    },
  })
  .query('getMemberImage', {
    input: z.string(),
    async resolve({ input, ctx }) {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: input,
          },
          select: {
            image: true,
          },
        })
        return user
      } catch (error) {
        console.log('error retrieving image', error)
      }
    },
  })
  .mutation('deleteMemberImage', {
    input: z.string(),
    async resolve({ input, ctx }) {
      try {
        const user = await ctx.prisma.user.update({
          where: {
            id: input,
          },
          data: {
            image: '',
          },
        })
        return user
      } catch (error) {
        console.log('error deleting image', error)
      }
    },
  })
  .mutation('updateMemberProfile', {
    input: z.object({
      studentId: z.string(),
      name: z.string(),
      gender: z.string(),
      batch: z.string(),
      year: z.string(),
      faculty: z.string(),
      telegram: z.string(),
      discord: z.string(),
      nusEmail: z.string(),
      personalEmail: z.string(),
      hobbies: z.string(),
      department: z.string(),
      roles: z.string(),
      major: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const user = await ctx.prisma.user.update({
          where: {
            id: input.studentId,
          },
          data: {
            name: input.name,
            gender: input.gender,
            batch: input.batch,
            year: input.year,
            faculty: input.faculty,
            telegram: input.telegram,
            discord: input.discord,
            email: input.nusEmail,
            personal_email: input.personalEmail,
            hobbies: input.hobbies,
            department: input.department,
            roles: input.roles,
            major: input.major,
          },
        })

        if (!user) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'No user found',
          })
        }

        if (!user.department) return { user }

        const projects = await ctx.prisma.departments.findUnique({
          where: {
            department_id: user.department,
          },
          select: {
            projects: true,
          },
        })

        return { user, projects }
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (e as Error).message,
        })
      }
    },
  })
  .mutation('updateMemberImage', {
    input: z.object({
      studentId: z.string(),
      image: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const user = await ctx.prisma.user.update({
          where: {
            id: input.studentId,
          },
          data: {
            image: input.image,
          },
        })
        return user
      } catch (error) {
        console.log('error updating image', error)
      }
    },
  })
