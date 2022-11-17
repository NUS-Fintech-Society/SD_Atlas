import type { NextPage, NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { Button, HStack, VStack, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const UserTable = dynamic(() => import('~/components/admin/user/UserTable'))

// Only allows the admin users to access this page.
export async function getServerSideProps(context: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (session.level !== 'super') {
    return {
      redirect: {
        destination: '/user',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

const UserHomePage: NextPage = () => {
  return (
    <>
      <VStack margin="auto">
        <UserTable />
        <div className="h-5"></div>
        <HStack>
          <Button>
            <Link href="/admin/users/upload-multiple-users">
              Upload Multiple Users
            </Link>
          </Button>
          <Spacer />
          <Button>
            <Link href="/admin/users/upload-single-user">Create a user</Link>
          </Button>
        </HStack>
      </VStack>
    </>
  )
}

export default UserHomePage
