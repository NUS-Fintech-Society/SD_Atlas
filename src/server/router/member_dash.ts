import {z} from "zod";
import {createRouter} from "./context"

export const dashRouter = createRouter()
.query("getRoles", {
    async resolve({ctx}) {
        try {
            return await ctx.prisma.user.findMany({
                where: {},
                distinct: ['roles'],
                select:{roles:true}
              })
        } catch (error) {
            console.log("error",error)
        }
    }
})
.query("getAll", {
    input: z.object({
        roles:z.string(),
    }),
    async resolve({ctx, input}) {
        try {
            return await ctx.prisma.user.findMany({
                where: {
                    roles: input.roles,
                  },
                select:{
                    name: true,
                    gender: true,
                    batch: true,
                    image: true,
                    year: true,
                    faculty: true,
                    telegram: true,
                    department: true,
                    roles:true,
                }
            })
        } catch (error) {
            console.log("error",error)
        }
    }
})
// .mutation("insertInfo",{
//     input: z.object({
//         name: z.string(),
//         batch: z.string(),
//         department: z.string(),
//         gender: z.string(),
//         faculty: z.string(),
//         role: z.string(),
//         student_id:z.string(),
//         telegram:z.string(),
//         year: z.string(),
//     }),
//     async resolve({ctx, input}) {
//         try {
//             await ctx.prisma.user.create({
//                 data:{
//                     name: input.name,
//                     batch: input.batch,
//                     department: input.department,
//                     gender: input.gender,
//                     faculty: input.faculty,
//                     roles: input.role,
//                     id: input.student_id,
//                     telegram: input.telegram,
//                     year: input.year 
//                 }
//             })
//         } catch(error) {
//             console.log(error)
//         }
//     }
// })