import { prisma } from "../../../server/db/client";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        studentId,
        name,
        gender,
        batch,
        year,
        faculty,
        telegram,
        discord,
        nus_email,
        personal_email,
        hobbies,
        department,
        roles,
        projects
    } = req.body;
    try {
        const updateMember = await prisma.user.update({
            where: {
                student_id: studentId,
            },
            data: {
                gender,
                name,
                batch,
                year,
                faculty,
                telegram,
                discord,
                nus_email,
                personal_email,
                hobbies,
                department,
                roles,
                projects
            },
        });
        res.status(200).json(updateMember);
    } catch (error) {
        res.status(403).json({ err: "Error occurred while updating details." });
    }
};