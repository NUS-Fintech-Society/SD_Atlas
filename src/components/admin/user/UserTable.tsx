import { trpc } from '~/utils/trpc'
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Text,
  Tbody,
  useDisclosure,
} from '@chakra-ui/react'
import LoadingScreen from '~/components/LoadingGif'
import ProfileInfoModal from '~/components/user/ProfileModal'
import { useState } from 'react'
import { Session } from 'next-auth'

// TODO: ABLE TO SEND EMAIL TO A USER NEXT TIME
const UserTable = ({ session }: { session: Session }) => {
  const { isLoading, data } = trpc.useQuery(['member.getAllUsers'])
  const [selected, setSelected] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (isLoading) return <LoadingScreen />

  const render = data?.map((data) => (
    <Tr key={data.id}>
      <Td>
        <Button
          variant="link"
          colorScheme="black"
          onClick={(e) => {
            e.preventDefault()
            setSelected(data.id)
            onOpen()
          }}
        >
          {data.id}
        </Button>
      </Td>
      <Td>{data.name}</Td>
      <Td>{data.telegram}</Td>
      <Td>{data.department}</Td>
    </Tr>
  ))

  return (
    <div className="mt-5">
      {render && render?.length ? (
        <>
          <TableContainer className="border-4 border-black">
            <Table
              align="center"
              variant="striped"
              colorScheme="teal"
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>Student ID</Th>
                  <Th>Name</Th>
                  <Th>Telegram</Th>
                  <Th>Department</Th>
                </Tr>
              </Thead>
              <Tbody>{render}</Tbody>
            </Table>
          </TableContainer>
          <ProfileInfoModal
            session={session}
            isOpen={isOpen}
            onClose={onClose}
            studentId={selected}
          />
        </>
      ) : (
        <Text fontSize="xl" fontWeight="bold">
          No users found
        </Text>
      )}
    </div>
  )
}

export default UserTable
