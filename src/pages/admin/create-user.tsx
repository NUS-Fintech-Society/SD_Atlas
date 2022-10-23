import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

const SignUpPage: NextPage = () => {
  const { data: session, status } = useSession()
  console.log("THE SESSION IS ", session)
  return <h1>Hi There</h1>
}

export default SignUpPage
