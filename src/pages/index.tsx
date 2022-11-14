import type { NextPage } from 'next'
import Image from 'next/image'
import AdminPage from '~/components/admin/Screen'
import { signIn, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  if (status === 'loading') return <h1>Loading...</h1>

  if (session) {
    return session.level === 'super' ? (
      <AdminPage />
    ) : (
      <h1>Fill up a page here please</h1>
    )
  }

  return (
    <>
      <div className="bg-black text-white h-screen">
        <div className="flex flex-col-reverse md:flex-row bg-black">
          <div className="flex flex-col font=[inter] ml-8">
            <div className="font-semibold text-6xl mb-8">
              <div>NUS</div>
              <div className="underline decoration-[#97AEFF] decoration-8">
                Fintech Society
              </div>
              <div className="mt-2 mb-2 text-2xl">
                Ideate. Innovate. Inspire
              </div>
            </div>
            <button
              className="bg-transparent border-2 border-[#FF8A00] font-medium hover:bg-slate-800 mb-[5%] p-3 rounded text-center text-xl w-44"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
          <Image
            alt="swe"
            className="place-items-center ml-3 mr-3"
            height={600}
            src="/undraw_software_engineer_re_tnjc.svg"
            width={600}
          />
        </div>
      </div>
    </>
  )
}

export default Home
