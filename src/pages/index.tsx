import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-black text-white h-screen">
        {/* NavBar */}
        <nav className="md:flex md:items-center md:justify-between w-full">
          <span className="cursor-pointer">
            <Image
              alt="Fintech Logo"
              className="inline"
              height={82}
              src="/fintech_logo_final-removebg_white.png"
              width={188}
            />
          </span>
        </nav>

        {/* HomePage */}

        <div>
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
            <button className="bg-transparent border-2 border-[#FF8A00] font-medium hover:bg-slate-800 p-3 rounded text-center text-xl w-44">
              <Link href="/">Find Out More</Link>
            </button>
          </div>
          <Image
            alt="swe"
            className=""
            height={600}
            src="/undraw_software_engineer_re_tnjc.svg"
            width={600}
          />
        </div>

        {/* Footer */}
        <footer className="w-full h-16 fixed left-0 bottom-0 bg-black"></footer>
      </div>
    </>
  )
}

export default Home
