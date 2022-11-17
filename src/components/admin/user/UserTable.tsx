import dynamic from 'next/dynamic'
import { trpc } from '~/utils/trpc'
const LoadingComponent = dynamic(
  () => import('~/components/common/LoadingComponent')
)

// START OF REACT TABLE LOGIC
// END OF REACT TABLE LOGIC

const UserTable = () => {
  const { isLoading, data } = trpc.useQuery(['member.getAllUsers'])

  if (isLoading) return <LoadingComponent text="Fetching the users now" />
  if (!data) return <>No Users Found</>

  return <></>
}

export default UserTable
