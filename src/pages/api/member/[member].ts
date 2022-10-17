import type {GetServerSideProps, NextApiRequest, NextApiResponse} from 'next'
import { prisma } from "../../../server/db/client";

export const getServerSideProps = async (context: { params: { studentId: string; }; }) => {
    const { studentId } = context.params;
    const user = await prisma.user.findUnique({ where: { student_id: studentId } });
    return {
        props: {
            user
        },
    };
}