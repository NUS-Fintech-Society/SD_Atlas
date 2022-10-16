import { prisma } from "../../../server/db/client";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { studentId, encodedImage} = req.body;
    try {
        const addMemberImage = await prisma.user.update({
            where: {
                student_id: studentId,
            },
            data: {
                image: encodedImage,
            },
        });
        res.status(200).json(addMemberImage);
    } catch (error) {
        res.status(403).json({ err: "Error occured while updating image." });
    }
};