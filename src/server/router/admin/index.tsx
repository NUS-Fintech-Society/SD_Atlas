import { createRouter } from '../context'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import type { User } from '@prisma/client'

const dashboardRouter = createRouter().mutation('/add-multiple-users', {
  input: z.array(
    z.object({
      department: z.string(),
      discord: z.string(),
      faculty: z.string(),
      gender: z.string(),
      hobbies: z.string(),
      name: z.string(),
      nus_email: z.string(),
      personal_email: z.string(),
      roles: z.string(),
      student_id: z.string(),
      telegram: z.string(),
      year: z.string(),
    })
  ),
  output: z.boolean(),
  resolve: async ({ ctx, input }) => {
    try {
      const hashedPassword = await hash('Fintech Is Cool', 10)

      const users: User[] = input.map((user) => {
        return {
          attendance: 0,
          batch: 'AY22/23',
          department: user.department,
          discord: user.discord,
          faculty: user.faculty,
          gender: user.gender,
          hashedPassword,
          hobbies: user.hobbies,
          image: null,
          level: 'member',
          id: user.student_id,
          name: user.name,
          email: user.nus_email,
          personal_email: user.personal_email,
          roles: user.roles,
          telegram: user.telegram,
          total_events: 0,
          wallet: null,
          year: user.year,
        }
      })

      // Transaction is automatically rolled back if an error occurs
      await ctx.prisma.user.createMany({
        data: users,
      })
      return true
    } catch (e) {
      return false
    }
  },
})

export default dashboardRouter
