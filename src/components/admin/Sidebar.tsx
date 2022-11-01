import { Button } from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import { Dispatch, SetStateAction } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { signOut } from 'next-auth/react'

const menuItems = [
  // { title: 'Home Page', icon: <AiFillHome /> },
  { title: 'Create a user', icon: <AddIcon /> },
  { title: 'Change Password', icon: <EditIcon /> },
]

type SideBarType = {
  setOption: Dispatch<SetStateAction<number>>
}

export default function SideBar({ setOption }: SideBarType) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="bg-gray-100 w-60">
        <nav>
          <ul>
            {menuItems.map(({ title, icon }, index) => (
              <li className="m-2 flex-1" key={title}>
                <Button
                  className="flex p-2 bg-gray-300 rounded hover:bg-gray-500 cursor-pointer"
                  leftIcon={icon}
                  onClick={(e) => {
                    e.preventDefault()
                    setOption(index)
                  }}
                  width="100%"
                >
                  {title}
                </Button>
              </li>
            ))}
            <li className="m-2 flex-1">
              <Button
                className="flex p-2 bg-gray-300 rounded hover:bg-gray-500 cursor-pointer"
                leftIcon={<AiOutlineLogout />}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
                width="100%"
              >
                Sign Out
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}
