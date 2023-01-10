import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const createEventRouter = createRouter()
.middleware(async ({ ctx, next }) => {
  // Any queries or mutations after this middleware will
  // raise an error unless there is a current session
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
})
.query("getAll", {
  async resolve({ ctx }) {
    try {
      return await ctx.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          department:true,
          roles:true,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  },
})
.mutation("createEvent", {
    input: z.object({ //use z from zod to validate input
      name: z.string(),
      date: z.date(),
      departments: z.array(z.string()),
      attendees: z.array(z.string())
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.event.create({//create a new row in the table
          data: {
            name: input.name,
            date: input.date,
            departments:input.departments,
            attendees:input.attendees,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
  
