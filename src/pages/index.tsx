import BottomNavBar from '~/components/mobile/BottomNavBar'
import { useSession } from 'next-auth/react'

const Page = () => {
  const { status, data: session } = useSession({ required: true })
  
  return (
    <>
      <BottomNavBar />
    </>
  )
}

export default Page
