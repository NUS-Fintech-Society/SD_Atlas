import {
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Box, Button, Container, useDisclosure } from '@chakra-ui/react'

const mockData = {
  name: 'Bob tan',
  gender: 'M',
  batch: 'AY2022/23',
  year: 2,
  faculty: 'Computing',
  major: 'Computer Science',
  telegram: '@bobbytan',
  discord: 'bobtan#123',
  nus_email: 'bobtan@u.nus.edu',
  personal_email: 'bobtan@gmail.com',
  hobbies: ['fishing', 'coding', 'running'],
  department: 'Software Development',
  role: 'Backend Engineer',
  projects: ['Atlas HRMS', 'DAO'],
}
const ProfilePage = () => {
  return (
    <Box
    >
      <Box className='flex justify-between gap-6 mt-4' >
        <ProfileInfo {...mockData} />
        <Box className="flex flex-col">
          <ProfilePicture />
          <ProfileContactInfo  {...mockData} />
        </Box>
      </Box>
    </Box>
  )
}

const ProfileContactInfo = ( props : ProfileInfoProps) => {
  return (
    <Box className="flex flex-col">
      <Box>
        <p>{props.telegram}</p>
      </Box>
      <Box>
        <p>{props.discord}</p>
      </Box>
      <Box>
        <p>{props.personal_email}</p>
      </Box>
      <Box>
        <p>{props.nus_email}</p>
      </Box>
    </Box>
  )
}

const ProfilePicture = () => {
  return (
    <Box
      className={'flex flex-col items-center'}
    >
      <Box className={'border-2 border-solid border-blue-300'}
      >
        <Box className='h-32 w-32 border-2 border-red-300' >
          Profile PIC
        </Box>
        <Box className='flex justify-end gap-1' >
          <UploadImageBtn />
          <DeleteImageBtn />
        </Box>
      </Box>
    </Box>
  )
}
const UploadImageBtn = () => {
  return (
    <Box className='h-10 w-10 border-2'>
      Ubtn
    </Box>
  )
}

const DeleteImageBtn = () => {
  return (
      <Box className='h-10 w-10 border-2'>
          Dbtn
      </Box>
  )
}

interface ProfileInfoProps {
  name: string
  gender: string
  batch: string
  year: number
  faculty: string
  major: string
  telegram: string
  discord: string
  nus_email: string
  personal_email: string
  hobbies: string[]
  department: string
  role: string
  projects: string[]
}
const ProfileInfo = (props: ProfileInfoProps) => {
  return (
    <Box>
        <p className={'text-3xl font-bold pl-4 mb-4'}>{props.name}</p>
        <TableContainer>
            <Table variant='unstyled' size={'sm'}>
                <Tbody>
                    <Tr>
                        <Td>ROLE</Td>
                        <Td>{props.role}</Td>
                    </Tr>
                    <Tr>
                        <Td>GENDER</Td>
                        <Td>{props.gender}</Td>
                    </Tr>
                    <Tr>
                        <Td>BATCH</Td>
                        <Td>{props.batch}</Td>
                    </Tr>
                    <Tr>
                        <Td>YEAR</Td>
                        <Td>{props.year}</Td>
                    </Tr>
                    <Tr>
                        <Td>FACULTY</Td>
                        <Td>{props.faculty}</Td>
                    </Tr>
                    <Tr>
                        <Td>MAJOR</Td>
                        <Td>{props.major}</Td>
                    </Tr>
                    <Tr>
                        <Td>DEPARTMENT</Td>
                        <Td>{props.department}</Td>
                    </Tr>
                    <Tr>
                        <Td>PROJECTS</Td>
                        <Td>{props.projects}</Td>
                        {/*TODO expand array*/}
                    </Tr>

                </Tbody>
            </Table>
        </TableContainer>
    </Box>
  )
}
const ProfileInfoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Container>
      <Button onClick={onOpen}>View Profile</Button>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={'white'} borderRadius={'lg'}>
          <ModalHeader borderTopRadius={'lg'} className={'bg-blue-600'}><p className={'pl-4 text-white'}>Personal Information</p></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfilePage />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default ProfileInfoModal
