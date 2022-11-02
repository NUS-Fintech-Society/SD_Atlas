import { ChangeEvent, useEffect, useRef, useState } from 'react'
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
import Image from 'next/image'

const MOCK_STUDENT_ID = 'asd'
const defaultImage = '/150.png'

const ProfilePage = ({ studentId }: { studentId: string }) => {
  const userQuery = trpc.useQuery(
    ['member-profile.getMemberProfile', studentId],
    {
      refetchOnWindowFocus: false,
    }
  )
  if (!userQuery || !userQuery.data) {
    return (
      <Box className="flex justify-center">
        <Spinner size="lg" />
      </Box>
    )
  }
  if (!userQuery.data.user) {
    return <p className="text-3xl">Something is wrong</p>
  }
  return (
    <Box className="flex flex-wrap justify-between gap-6 mt-4">
      <ProfileInfo {...userQuery.data.user} />
      <Box className="flex flex-col">
        <ProfilePicture studentId={studentId} />
        <ProfileContactInfo {...userQuery.data.user} />
      </Box>
    </Box>
  )
}

const ProfileContactInfo = (props: any) => {
  return (
    <Box className="flex flex-col gap-1">
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

const ProfilePicture = ({ studentId }: { studentId: string }) => {
  const imageQuery = trpc.useQuery(
    ['member-profile.getMemberImage', studentId],
    {
      refetchOnWindowFocus: false,
    }
  )
  const [image, setImage] = useState(defaultImage)
  useEffect(() => {
    if (imageQuery.data?.image) {
      setImage(imageQuery.data.image as string)
    }
  }, [imageQuery])
  return (
    <Box className="flex flex-col items-center">
      <Box className="my-2">
        <Image
          src={image}
          height={150}
          width={150}
          unoptimized={true} // needed for use with objectURLs
        ></Image>
        <Box className="flex justify-end">
          <UploadImageBtn setImage={setImage} studentId={studentId} />
          <DeleteImageBtn setImage={setImage} studentId={studentId} />
        </Box>
      </Box>
    </Box>
  )
}
// reference: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
// https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
const UploadImageBtn = ({
  setImage,
  studentId,
}: {
  setImage: any
  studentId: string
}) => {
  // trigger a click event on the file input element when button is clicked
  const uploadRef = useRef<HTMLInputElement>(null)
  const updateImageMutation = trpc.useMutation([
    'member-profile.updateMemberImage',
  ])
  const onUpload = () => {
    uploadRef.current?.click()
  }
  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files.item(0)
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const imageDataURI = reader.result
        setImage(imageDataURI)
        const image = imageDataURI as string
        updateImageMutation.mutate({ studentId, image })
      })
      reader.readAsDataURL(file as Blob)
    }
  }
  return (
    <Button variant={'ghost'} size={'xs'} onClick={onUpload}>
      <IconContext.Provider value={{ size: '24px' }}>
        <div>
          <BsUpload />
        </div>
      </IconContext.Provider>
      <input
        type={'file'}
        accept={'image/png, image/jpeg'}
        ref={uploadRef}
        onChange={handleFileSelected}
        className={'hidden'}
      />
    </Button>
  )
}

const DeleteImageBtn = ({
  setImage,
  studentId,
}: {
  setImage: any
  studentId: string
}) => {
  const deleteImageMutation = trpc.useMutation(
    ['member-profile.deleteMemberImage'],
    {
      onSuccess: (data) => {
        setImage(defaultImage)
      },
    }
  )
  const handleDelete = () => {
    deleteImageMutation.mutate(studentId)
  }
  return (
    <Button variant={'ghost'} size={'xs'} onClick={handleDelete}>
      <IconContext.Provider value={{ size: '24px' }}>
        <div>
          <BsTrash />
        </div>
      </IconContext.Provider>
    </Button>
  )
}

const ProfileInfo = (props: any) => {
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
            <ProfilePage studentId={MOCK_STUDENT_ID} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default ProfileInfoModal
