import { trpc } from '../../utils/trpc'
import {
  BsDiscord,
  BsEnvelopeFill,
  BsTelegram,
  BsTrash,
  BsUpload,
} from 'react-icons/bs'
import { IconContext } from 'react-icons'
import {
  Box,
  Spinner,
  Button,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useDisclosure,
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

const mockData = {
  name: 'Bob Tan',
  gender: 'M',
  batch: 'AY2022/23',
  year: 2,
  faculty: 'Computing',
  major: 'Computer Science',
  telegram: '@bobbytan',
  discord: 'bobtan #123',
  nus_email: 'bobtan@u.nus.edu',
  personal_email: 'bobtan@gmail.com',
  hobbies: ['fishing', 'coding', 'running'],
  department: 'Software Development',
  roles: 'Backend Engineer',
  projects: ['Atlas HRMS', 'DAO', 'Fintech Month'],
}
const ProfilePage = () => {
  const query = trpc.useQuery(['member-profile.getMemberProfile', 'asd'])
  if (!query.data) {
    return (
      <Box className="flex justify-center">
        <Spinner size="lg" />
      </Box>
    )
  }
  if (!query.data.user) {
    return <p className={'text-3xl'}>Something is wrong</p>
  }
  return (
    <Box className="flex flex-wrap justify-between gap-6 mt-4">
      <ProfileInfo {...query.data.user} />
      <Box className="flex flex-col">
        <ProfilePicture />
        <ProfileContactInfo {...query.data.user} />
      </Box>
    </Box>
  )
}

const ProfileContactInfo = (props: any) => {
  return (
    <Box className="flex flex-col px-4 gap-1">
      <Box className="flex items-center gap-1">
        <BsTelegram className="fill-[#0088cc]" />
        <p>{props.telegram}</p>
      </Box>
      <Box className="flex items-center gap-1">
        <BsDiscord className="fill-[#5865F2]" />
        <p>{props.discord}</p>
      </Box>
      <Box className="flex items-center gap-1">
        <BsEnvelopeFill />
        <p>{props.personal_email}</p>
      </Box>
      <Box className="flex items-center gap-1">
        <BsEnvelopeFill className="fill-blue-300" />
        <p>{props.email}</p>
      </Box>
    </Box>
  )
}

const ProfilePicture = () => {
  return (
    <Box className="flex flex-col items-center">
      <Box className="my-2">
        <Box className="h-40 w-40 mb-1 border-2 border-red-300">
          Profile PIC
        </Box>
        <Box className="flex justify-end gap-1">
          <UploadImageBtn />
          <DeleteImageBtn />
        </Box>
      </Box>
    </Box>
  )
}
const UploadImageBtn = () => {
  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <div>
        <BsUpload />
      </div>
    </IconContext.Provider>
  )
}

const DeleteImageBtn = () => {
  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <div>
        <BsTrash />
      </div>
    </IconContext.Provider>
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

const ProfileInfo = (props: any) => {
  console.log(props)
  return (
    <Box>
      <p className="text-3xl font-bold pl-4 mb-4">{props.name}</p>
      <TableContainer>
        <Table variant="unstyled" size={'sm'}>
          <Tbody>
            <Tr>
              <Td>ROLE</Td>
              <Td>{props.roles}</Td>
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
            {/*<Tr>*/}
            {/*  <Td className="align-baseline">PROJECTS</Td>*/}
            {/*  <Td>*/}
            {/*    <ol>*/}
            {/*      {props.projects.map((projectName) => (*/}
            {/*        <li key={projectName}>*/}
            {/*          <p>{projectName}</p>*/}
            {/*        </li>*/}
            {/*      ))}*/}
            {/*    </ol>*/}
            {/*  </Td>*/}
            {/*</Tr>*/}
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
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="white" borderRadius="lg">
          <ModalHeader borderTopRadius="lg" className="bg-blue-600">
            <p className="pl-4 text-white">Personal Information</p>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <ProfilePage />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default ProfileInfoModal
