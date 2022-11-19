import BottomNavBar from './UserBottomNavBar'
import Navbar from './Navbar'

const Screen = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <>
      <Navbar />
      {children}
      <BottomNavBar />
    </>
  )
}

export default Screen
