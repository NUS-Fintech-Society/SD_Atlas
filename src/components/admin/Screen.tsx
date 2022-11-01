import UserForm from '../../components/admin/UserForm'
import SideBar from '../../components/admin/Sidebar'
import { HStack } from '@chakra-ui/react'
import ChangePasswordPage from '../../components/admin/ChangePassword'
import { useState } from 'react'

const components = [<UserForm key={0} />, <ChangePasswordPage key={2} />]

const AdminPage = () => {
  const [options, setOption] = useState(0)

  return (
    <HStack align="start">
      <SideBar setOption={setOption} />
      {components[options]}
    </HStack>
  )
}

export default AdminPage
