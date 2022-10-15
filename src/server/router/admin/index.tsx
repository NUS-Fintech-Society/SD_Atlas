import { createRouter } from '../context'
import { z } from 'zod'

const dashboardRouter = createRouter().mutation('addUsers', {
  input: z.object({
    data: z.array(
      z.object({
        'Full Name': z.string(),
        'NUS email': z.string(),
      })
    ),
  }),
  resolve: async ({ctx}) => {

  },
})
