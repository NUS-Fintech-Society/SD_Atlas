import type { NextPage } from 'next'
import styles from './index.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-black text-white h-screen">
        {/* NavBar */}
        <nav className="md:flex md:items-center md:justify-between">
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
        <div className="flex flex-col font=[inter] ml-[2.5%]">
          <div className="font-semibold text-6xl mb-[2.5%]">
            <div>NUS</div>
            <div className="underline decoration-[#97AEFF] decoration-8">
              Fintech Society
            </div>
            <div className="mt-2 mb-2 text-2xl">Ideate. Innovate. Inspire</div>
          </div>
          <button className="bg-transparent border-2 border-[#FF8A00] font-medium hover:bg-slate-800 p-3 rounded text-center text-xl w-44">
            <Link href="/">Find Out More</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
