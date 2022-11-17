import dynamic from 'next/dynamic'
import { trpc } from '~/utils/trpc'
import {
  Input,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Text,
  Tbody,
} from '@chakra-ui/react'
const LoadingComponent = dynamic(
  () => import('~/components/common/LoadingComponent')
)
import { useState } from 'react'

const UserTable = () => {
  const { isLoading, data } = trpc.useQuery(['member.getAllUsers'])
  const [conditions, setConditions] = useState('')

  // REGEX USED FOR SEARCHING
  const render = () => {
    if (conditions && data) {
      // Filters out all the relevant data by name, id or department
      const returned = data?.filter((d) => {
        return (
          d.id.startsWith(conditions.toUpperCase()) ||
          d.id.startsWith(conditions.toLowerCase()) ||
          d.name?.startsWith(conditions.toUpperCase()) ||
          d.name?.startsWith(conditions.toLowerCase()) ||
          d.department?.startsWith(conditions.toUpperCase()) ||
          d.department?.startsWith(conditions.toLowerCase())
        )
      })

      return returned.map((data) => {
        return (
          <Tr key={data.id}>
            <Td>{data.id}</Td>
            <Td>{data.name}</Td>
            <Td>{data.discord}</Td>
            <Td>{data.telegram}</Td>
            <Td>{data.department}</Td>
          </Tr>
        )
      })
    }

    return data?.map((data) => {
      return (
        <Tr key={data.id}>
          <Td>{data.id}</Td>
          <Td>{data.name}</Td>
          <Td>{data.discord}</Td>
          <Td>{data.telegram}</Td>
          <Td>{data.department}</Td>
        </Tr>
      )
    })
  }

  if (isLoading) return <LoadingComponent text="Fetching the users now" />

  return (
    <>
      <Text fontSize="m" fontWeight="bold">
        You may search for the user based on the name, department and id.
      </Text>
      <div className="h-3"></div>
      <Input
        maxWidth="90%"
        placeholder="Enter your search query"
        onChange={(e) => {
          e.preventDefault()
          setConditions(e.target.value)
        }}
      />
      <div className="h-5"></div>
      {render() && render()?.length ? (
        <TableContainer className="border-black">
          <Table align="center" variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Student ID</Th>
                <Th>Name</Th>
                <Th>Discord</Th>
                <Th>Telegram</Th>
                <Th>Department</Th>
              </Tr>
            </Thead>
            <Tbody>{render()}</Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text fontSize="xl" fontWeight="bold">
          No users found
        </Text>
      )}
    </>
  )
}

export default UserTable
