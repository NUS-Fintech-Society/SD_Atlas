import type { NextPage, NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { trpc } from '~/utils/trpc'
import { Button, Stack } from '@chakra-ui/react'
import Link from 'next/link'

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
  const { isLoading, data } = trpc.useQuery(['member.getAllUsers'])

  if (isLoading) return <h1>Loading...</h1>
  console.log(data)
  return (
    <>
      <Stack align="center" direction={['column', 'row', 'row']}>
        <Button>
          <Link href="/admin/users/upload-multiple-users">
            Upload Multiple Users
          </Link>
        </Button>
        <Button>
          <Link href="/admin/users/upload-single-user">Create a user</Link>
        </Button>
      </Stack>
    </>
  )
}

export default UserHomePage
