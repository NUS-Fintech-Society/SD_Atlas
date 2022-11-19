import BottomNavBar from '~/components/mobile/UserBottomNavBar'
import LoadingScreen from '~/components/LoadingGif'
import { useSession } from 'next-auth/react'

const Page = () => {
  const { status } = useSession({ required: true })

  if (status === 'loading') return <LoadingScreen />

  return (
    <>
      <BottomNavBar />
    </>
  )
}

export default Page
