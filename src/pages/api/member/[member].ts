import type {GetServerSideProps, NextApiRequest, NextApiResponse} from 'next'
import { prisma } from "../../../server/db/client";

export async function getServerSideProps(context: { params: { studentId: string; }; }) {
    const { studentId } = context.params;
    const user = await prisma.user.findUnique({ where: { student_id: studentId } });
    return {
        props: {
            user
        },
    };
}