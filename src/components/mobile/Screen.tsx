import BottomNavBar from './UserBottomNavBar'
import Navbar from './Navbar'

const Screen = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <>
      <Navbar />
      <div className="w-5/6 mx-auto">{children}</div>
      <BottomNavBar />
    </>
  )
}

export default Screen
