import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const ProfilePage = () => {
  const router = useRouter()
  const session = useSession()

  if (session.status === 'unauthenticated') router.push('/login')

  return <>Welcome {session?.data?.user?.name}!</>
}

export default ProfilePage
