import {z} from "zod";
import { createRouter } from "./context"
import { TRPCError } from "@trpc/server";
import {prisma} from "../db/client";

export const profileRouter = createRouter()
    .query("getMemberProfile", {
        input: z
            .object({
                studentId: z.string(),
            }),
        async resolve({input, ctx}) {
            try {
                const user =  await ctx.prisma.user.findUnique({
                    where: {
                        student_id: input.studentId },
                    select:{
                        name: true,
                        gender: true,
                        batch: true,
                        year: true,
                        faculty: true,
                        telegram: true,
                        discord: true,
                        nus_email: true,
                        personal_email: true,
                        hobbies: true,
                        department: true,
                        roles: true,
                        projects: true
                    }
                });
                return {
                    props: {
                        user
                    }};
            } catch (error) {
                console.log("error",error)
            }
        }
    })