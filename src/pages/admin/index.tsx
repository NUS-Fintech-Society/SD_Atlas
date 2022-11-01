import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import UserForm from '../../components/admin/UserForm'
import SideBar from '../../components/common/sidebar'
import { HStack } from '@chakra-ui/react'
import { useState } from 'react'

const components = [<UserForm key={0} />]

const AdminPage: NextPage = () => {
  const { data: session, status } = useSession()
  const [options, setOption] = useState(0)

  if (status === 'loading') return <h1>Loading...</h1>

  if (!session || !session.level || session.level === 'member') {
    return <h1>You do not have permission to view this page</h1>
  }

  return (
    <HStack align="start">
      <SideBar setOption={setOption} />
      {components[options]}
    </HStack>
  )
}

export default AdminPage
