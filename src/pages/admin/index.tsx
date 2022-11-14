import SidebarWithHeader from '~/components/admin/AdminSidebar'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import DashboardPage from '~/components/admin/pages/upload-multiple-users'
import UserForm from '~/components/admin/pages/upload-single-user'
import { RootState } from '~/store/store'

const Pages = [
  <DashboardPage key={0} />,
  <UserForm key={1} />,
]

const AdminPage: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
  })
  const index = useSelector<RootState, number>((state) => state.adminNavbar)

  if (status === 'loading') return <h1>Loading...</h1>
  if (session?.level !== 'super') router.push('/')

  return <SidebarWithHeader>{Pages[index]}</SidebarWithHeader>
}

export default AdminPage
