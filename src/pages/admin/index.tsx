import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import UserForm from '../../components/admin/form'

const AdminPage: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return <h1>Loading...</h1>

  if (!session || !session.level || session.level === 'member') {
    return <h1>You do not have permission to view this page</h1>
  }

  return <UserForm />
}

export default AdminPage
