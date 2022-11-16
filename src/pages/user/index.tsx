import type { NextPage } from 'next'
import { Text, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { trpc } from '~/utils/trpc'

const HomePage: NextPage = () => {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  const { isLoading, data } = trpc.useQuery(['user.getProjects'])

  if (status === 'loading') return <h1>Loading...</h1>
  if (session && session.level === 'super') router.push('/admin')

  return (
    <VStack>
      <Heading name={session?.user?.name} />
    </VStack>
  )
}

const Heading = ({ name }: { name?: string | null }) => {
  return <Text fontSize="4xl">Welcome back, {name || 'Annonymous User'}!</Text>
}

export default HomePage
