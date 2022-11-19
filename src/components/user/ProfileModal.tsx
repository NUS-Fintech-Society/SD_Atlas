import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { trpc } from '../../utils/trpc'
import LoadingScreen from '~/components/LoadingGif'
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
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useToast,
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

const defaultImage = '/150.png'

const ProfilePage = ({ studentId }: { studentId: string }) => {
  // TRPC USEQUERY HOOK: SET REFETCH TO FALSE TO CACHE THE DATA
  const { data, isLoading, isError } = trpc.useQuery(
    ['member-profile.getMemberProfile', studentId],
    {
      refetchOnWindowFocus: true,
    }
  )

  // IF THE DATA IS LOADING, RETURN THE LOADING SCREEN
  if (isLoading) return <LoadingScreen />

  // IF THERE IS SOMETHING WRONG WITH FETCHING THE USER, THROW AN ERROR
  if (!data || !data.user || isError) {
    return <p className="text-3xl">Something is wrong</p>
  }

  return (
    <div className="flex flex-wrap justify-between gap-6 mt-4">
      <ProfileInfo {...data.user} />
      <div className="flex flex-col">
        <ProfilePicture studentId={studentId} />
        <ProfileContactInfo {...data.user} />
      </div>
    </div>
  )
}

const ProfileContactInfo = (props: {
  telegram: string | null
  discord: string | null
  personal_email: string | null
  email: string
}) => {
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
          alt="profile-pic"
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
  setImage: Dispatch<SetStateAction<string>>
  studentId: string
}) => {
  const toast = useToast()
  // trigger a click event on the file input element when button is clicked
  const uploadRef = useRef<HTMLInputElement>(null)
  const updateImageMutation = trpc.useMutation([
    'member-profile.updateMemberImage',
  ])
  const onUpload = () => {
    uploadRef.current?.click()
  }
  const handleFileSelected = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      if (e.target.files) {
        const file = e.target.files.item(0)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          const imageDataURI = reader.result as string
          setImage(imageDataURI)
          const image = imageDataURI as string
          updateImageMutation.mutate({ studentId, image })
        })
        reader.readAsDataURL(file as Blob)
      }

      toast({
        duration: 3000,
        description: 'Image successfully uploaded.',
        title: 'Success',
        status: 'success',
      })
    } catch (e) {
      toast({
        duration: 3000,
        description: (e as Error).message,
        status: 'error',
        title: 'Something went wrong',
      })
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
  setImage: Dispatch<SetStateAction<string>>
  studentId: string
}) => {
  const toast = useToast()
  const { mutateAsync } = trpc.useMutation(
    ['member-profile.deleteMemberImage'],
    {
      onSuccess: () => {
        setImage(defaultImage)
      },
    }
  )

  // DELETE IMAGE LOGIC
  const handleDelete = async () => {
    try {
      await mutateAsync(studentId)
      toast({
        duration: 3000,
        description: 'Image successfully deleted.',
        title: 'Success',
        status: 'success',
      })
    } catch (e) {
      toast({
        duration: 3000,
        description: (e as Error).message,
        status: 'error',
        title: 'Something went wrong',
      })
    }
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

const ProfileInfo = (props: ProfilePageType) => {
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
const ProfileInfoModal = ({
  studentId,
  onClose,
  isOpen,
}: {
  studentId: string
  onClose: () => void
  isOpen: boolean
}) => {
  return (
    <div>
      <PersonalInformationModal
        isOpen={isOpen}
        onClose={onClose}
        studentId={studentId}
      />
    </div>
  )
}

const PersonalInformationModal = ({
  isOpen,
  onClose,
  studentId,
}: {
  isOpen: boolean
  onClose: () => void
  studentId: string
}) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent backgroundColor="white" borderRadius="lg">
        <ModalHeader borderTopRadius="lg" className="bg-blue-600">
          <p className="pl-4 text-white">Personal Information</p>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <ProfilePage studentId={studentId} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

type ProfilePageType = {
  name: string | null
  roles: string | null
  gender: string | null
  batch: string | null
  year: string | null
  faculty: string | null
  major: string | null
  department: string | null
}

export default ProfileInfoModal
