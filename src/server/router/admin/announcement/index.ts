import { createProtectedRouter } from '../../context'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

const AnnouncementRouter = createProtectedRouter()
  .mutation('create-announcement', {
    input: z.object({
      content: z.string(),
      title: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session.user.id },
        })

        if (!user || user.level !== 'super') {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You cannot create an event',
          })
        }

        await ctx.prisma.announcements.create({
          data: {
            announcement_id: randomUUID(),
            content: input.content,
            title: input.title,
            updated_date: dayjs().toDate(),
            uploaded_date: dayjs().toDate(),
            userId: ctx.session.user.id,
          },
        })
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (e as Error).message,
        })
      }
    },
  })
  .query('getAllAnnouncements', {
    resolve: async ({ ctx }) => {
      try {
        const announcements = await ctx.prisma.announcements.findMany({
          include: {
            created_by: {
              select: { name: true },
            },
          },
        })

        console.log(announcements)
        return announcements
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (e as Error).message,
        })
      }
    },
  })

export default AnnouncementRouter
