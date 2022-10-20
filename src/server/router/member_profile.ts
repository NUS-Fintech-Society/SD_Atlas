import { z } from 'zod'
import { createRouter } from './context'
import { TRPCError } from '@trpc/server'
import { prisma } from '../db/client'

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
            telegram: true,
            discord: true,
            email: true,
            personal_email: true,
            hobbies: true,
            department: true,
            roles: true,
            //projects: true
          },
        })
        return user
      } catch (error) {
        console.log('error retrieving member profile', error)
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
      projects: z.string(),
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
            //projects: input.projects
          },
        })
        return user
      } catch (error) {
        console.log('error updating member profile details', error)
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
