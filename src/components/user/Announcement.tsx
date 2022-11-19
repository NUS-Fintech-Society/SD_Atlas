import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { trpc } from '~/utils/trpc'
import LoadingScreen from '../LoadingGif'

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
        <LoadingScreen />
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
