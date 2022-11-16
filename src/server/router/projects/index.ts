import { createProtectedRouter } from '../context'
import { TRPCError } from '@trpc/server'

const ProjectRouter = createProtectedRouter().query('getAllProjects', {
  resolve: async ({ ctx }) => {
    try {
      // Get all the projects by date of created
      const projects = await ctx.prisma.projects.findMany({
        select: {
          created_date: true,
          name: true,
          project_id: true,
          team_lead: true,
        },
        orderBy: [
          {
            created_date: 'desc',
          },
        ],
      })
      return projects
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: (e as Error).message,
      })
    }
  },
})

export default ProjectRouter
