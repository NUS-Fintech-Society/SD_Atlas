import type { NextPage } from 'next'
import { VStack } from '@chakra-ui/react'
import Header from '~/components/user/Header'
import { useSession } from 'next-auth/react'
import ProjectTable from '~/components/user/ProjectTable'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'

const HomePage: NextPage = () => {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') return <h1>Loading...</h1>

  return (
    <VStack>
      <Header name={session?.user?.name} />
      <ProjectTable />
    </VStack>
  )
}

export default HomePage

// This is used to protect this route.
export async function getServerSideProps(context) {
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
