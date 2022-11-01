import { Button } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

const menuItems = ['Create a user', 'Change Password']

type SideBarType = {
  setOption: Dispatch<SetStateAction<number>>
}

export default function SideBar({ setOption }: SideBarType) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="bg-gray-100 w-60">
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li className="m-2 flex-1" key={item}>
                <Button
                  className="flex p-2 bg-gray-300 rounded hover:bg-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    setOption(index)
                  }}
                  width="100%"
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
