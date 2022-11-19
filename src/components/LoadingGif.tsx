import LoadingGif from '../../public/giphy.gif'
import Image from 'next/image'

const LoadingScreen = () => {
  return (
    <div className="flex h-full items-center justify-center bg-primary p-[23px] text-center">
      <Image alt="LoadingScreen" src={LoadingGif} width={250} height={250} />
    </div>
  )
}

export default LoadingScreen
