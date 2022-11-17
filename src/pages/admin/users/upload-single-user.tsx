import { trpc } from '../../../utils/trpc'
import { NextApiRequest, NextApiResponse } from 'next'
import { useFormik } from 'formik'
import {
  Button,
  Input,
  Select,
  useToast,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'

interface FormValues {
  id: string
  level: string
  email: string
  password: string
}

const UserForm = () => {
  const { mutateAsync } = trpc.useMutation('member.create-user')
  const toast = useToast()
  const initialValues: FormValues = {
    id: '',
    level: '',
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        if (values.email.endsWith('@u.nus.edu')) {
          toast({
            title: 'Incorrect email format',
            description: 'Remove the domain',
            status: 'error',
            duration: 3000,
          })
          return
        }
        values.email = values.email + '@u.nus.edu'
        await mutateAsync(values)
        toast({
          title: 'Successfully updated!',
          description: 'User successfully created',
          status: 'success',
          isClosable: true,
          duration: 9000,
        })
      } catch (e) {
        toast({
          title: 'Oops! Something went wrong',
          description: (e as Error).message,
          status: 'error',
          isClosable: true,
          duration: 9000,
        })
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        id="id"
        isRequired
        marginY={5}
        name="id"
        onChange={formik.handleChange}
        placeholder="Enter the student id"
        value={formik.values.id}
        variant="outline"
      />

      <InputGroup>
        <Input
          id="email"
          isRequired
          marginBottom={5}
          name="email"
          onChange={formik.handleChange}
          placeholder="Enter a email"
          value={formik.values.email}
          variant="outline"
        />
        <InputRightAddon> @u.nus.edu </InputRightAddon>
      </InputGroup>

      <Input
        id="password"
        isRequired
        marginBottom={5}
        name="password"
        type="password"
        onChange={formik.handleChange}
        placeholder="Enter a password"
        value={formik.values.password}
        variant="outline"
      />

      <Select
        marginBottom={5}
        isRequired
        onChange={(e) => {
          e.preventDefault()
          formik.values.level = e.target.value
        }}
        placeholder="Select the level"
      >
        <option value="member">Member</option>
        <option value="lead">Lead</option>
        <option value="codirector">Co-Director</option>
        <option value="director">Director</option>
        <option value="super">Admin</option>
      </Select>

      <Button bg="gray.300" isLoading={formik.isSubmitting} type="submit">
        Create User
      </Button>
    </form>
  )
}

export default UserForm

export async function getServerSideProps(context: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (session.level !== 'super') {
    return {
      redirect: {
        destination: '/user',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
