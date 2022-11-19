import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import UserTable from '~/components/admin/user/UserTable'
import BottomNavBar from '~/components/mobile/UserBottomNavBar'
import SidebarWithHeader from '~/components/mobile/Sidebar'
import { useSession } from 'next-auth/react'
import LoadingScreen from '~/components/LoadingGif'
import { useRouter } from 'next/router'

export default function AdminUserPage() {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  if (status === 'loading') return <LoadingScreen />
  if (session.level !== 'super') router.push('/users')

  return (
    <SidebarWithHeader>
      <div className="w-5/6 mx-auto flex flex-col">
        <UserTable session={session} />
        <Buttons />
      </div>
      <BottomNavBar />
    </SidebarWithHeader>
  )
}

const Buttons = () => {
  return (
    <div className="flex mt-5 justify-between">
      <Button bg="light.secondary.primary" className="text-white">
        <Link href="/admin/users/upload-multiple-users">
          Upload Multiple Users
        </Link>
      </Button>

      <Button bg="light.secondary.primary" className="text-white">
        <Link href="/admin/users/upload-single-user">Create a user</Link>
      </Button>
    </div>
  )
}
