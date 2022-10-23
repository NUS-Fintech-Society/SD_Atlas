import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const SignUpPage: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (!session || session?.level != 2) {
    return <h1>You do not have the permission to view this page</h1>
  }

  return <h1>Hi There</h1>
}

export default SignUpPage
