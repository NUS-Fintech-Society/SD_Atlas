import { useSession } from 'next-auth/react'
import { trpc } from '~/utils/trpc'
import { Input } from '@chakra-ui/react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() => import('~/components/common/LoadingScreen'))

const EditProfilePage: NextPage = () => {
  const { status } = useSession({ required: true })
  const { isLoading, data } = trpc.useQuery(['user.getUserInfo'])

  if (status === 'loading' || isLoading || !data) return <LoadingScreen />

  return (
    <form>
      <Input id="name" name="name" value={data.name as string} />
    </form>
  )
}

export default EditProfilePage
