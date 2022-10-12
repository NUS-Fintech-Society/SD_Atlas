import {
  Table,
  TableCaption,
  TableContainer,
  Td,
  Th,
  Tr,
  Thead,
  Tbody,
} from '@chakra-ui/react'
import { tableDataType } from '../../pages/admin'

export default function DataTable({ data }: { data: tableDataType[] }) {
  // Used to display the data on the screen
  const displayData = data.map((item, index) => {
    return (
      <Tr key={index}>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>{item.telegram}</Td>
      </Tr>
    )
  })

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Please review the data before submitting it</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>NUS Email</Th>
            <Th>Telegram</Th>
          </Tr>
        </Thead>
        <Tbody>{displayData}</Tbody>
      </Table>
    </TableContainer>
  )
}
