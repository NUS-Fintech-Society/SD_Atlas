import Image from 'next/image'

export default function NavBar() {
  return (
    <nav className="bg-black h-15 md:flex md:items-center md:justify-between w-full">
      <span className="cursor-pointer">
        <Image
          alt="Fintech Logo"
          className="inline"
          height={70}
          src="/fintech_logo_final-removebg_white.png"
          width={188}
        />
      </span>
    </nav>
  )
}
