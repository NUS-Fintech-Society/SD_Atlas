import dynamic from 'next/dynamic'
const Header = dynamic(() => import('~/components/user/Header'))
const AnnouncementTable = dynamic(
  () => import('~/components/user/Announcement')
)
import LoadingScreen from '~/components/LoadingGif'
import type { NextPage, NextApiRequest, NextApiResponse } from 'next'
import { VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'

const HomePage: NextPage = () => {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') return <LoadingScreen />

  return (
    <VStack>
      <Header name={session?.user?.name} />
      <AnnouncementTable />
    </VStack>
  )
}

export default HomePage

// This is used to protect this route.
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

  if (session.level === 'super') {
    return {
      redirect: {
        destination: '/admin',
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
