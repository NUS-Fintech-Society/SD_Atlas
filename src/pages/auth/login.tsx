import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { useState, FormEvent } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import LoadingScreen from '~/components/LoadingGif'
import Button from '~/components/utility/Button'
import Head from 'next/head'
import Link from 'next/link'

const LoginPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitForm = async (e: FormEvent<HTMLElement>) => {
    try {
      e.preventDefault()
      setSubmitting(true)
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res && res.ok) {
        router.push('/users')
        return
      }

      if (res && res.error) {
        setSubmitting(false)
        toast.error(res.error, {
          duration: 2000,
          position: 'bottom-center',
        })
        return
      }
    } catch (e) {
      setSubmitting(false)
      toast.error('Oops, something went wrong. Please try again', {
        duration: 2000,
        position: 'bottom-center',
      })
    }
  }

  if (status === 'loading') return <LoadingScreen />
  if (session) {
    if (session.level === 'admin') router.push('/admin')
    router.push('/user')
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-full min-h-screen p-4 flex flex-col items-center justify-center">
          <div className="p-8 w-full max-w-3xl border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-1000">
            <form onSubmit={submitForm}>
              <div className="flex flex-col items-start">
                <h1 className="mb-2 text-center self-center font-bold text-5xl">
                  Login
                </h1>

                <label htmlFor="email" className="font-bold">
                  NUS Email
                </label>
                <div className="flex flex-row w-full items-center mt-2">
                  <input
                    className="w-full pl-4 py-2 outline outline-gray-200 rounded-l"
                    id="email"
                    required
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    value={email}
                  />
                  <div className="flex p-2.5 bg-gray-200 rounded-r">
                    @u.nus.edu
                  </div>
                </div>

                <label htmlFor="password" className="font-bold">
                  Password
                </label>
                <input
                  className="w-full pl-4 py-2 outline outline-gray-200 rounded-md mt-2"
                  id="password"
                  required
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />

                <Link href="/auth/forgot-password">
                  <div className="mt-4 underline">Forgot your password?</div>
                </Link>
                <Button
                  className="mt-2 self-stretch shadow-md"
                  disabled={!email || !password}
                  isLoading={submitting}
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default LoginPage
