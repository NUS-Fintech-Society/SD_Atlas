import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { trpc } from '~/utils/trpc'
const LoadingComponent = dynamic(
  () => import('~/components/common/LoadingComponent')
)

const AnnouncementTable = () => {
  const { isLoading, data } = trpc.useQuery([
    'announcement.getAllAnnouncements',
  ])

  // Used to render the projects
  const render = () => {
    return data?.map((announcement) => {
      return (
        <Tr key={announcement.announcement_id}>
          <Td>{announcement.title}</Td>
          <Td>{announcement.content}</Td>
          <Td>{announcement.updated_date.toLocaleString()}</Td>
          <Td>{announcement.created_by.name || 'Admin User'}</Td>
        </Tr>
      )
    })
  }

  return (
    <>
      {isLoading ? (
        <LoadingComponent text="Retrieving Announcements Now" />
      ) : (
        <TableContainer maxWidth="90vw">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Content</Th>
                <Th>Last Updated On</Th>
                <Th>Created By</Th>
              </Tr>
            </Thead>
            <Tbody>{render()}</Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default AnnouncementTable
