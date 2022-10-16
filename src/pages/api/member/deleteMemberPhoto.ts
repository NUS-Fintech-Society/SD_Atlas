import { prisma } from "../../../server/db/client";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { studentId} = req.body;
    try {
        const deleteMemberImage = await prisma.user.update({
            where: {
                student_id: studentId,
            },
            data: {
                image: "",
            },
        });
        res.status(200).json(deleteMemberImage);
    } catch (error) {
        res.status(403).json({ err: "Error occured while deleting image." });
    }
};