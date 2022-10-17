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