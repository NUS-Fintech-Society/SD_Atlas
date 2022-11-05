import { trpc } from '../../utils/trpc'
import { useFormik } from 'formik'
import { useState } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Container,
  Input,
  Select,
} from '@chakra-ui/react'

interface FormValues {
  id: string
  level: string
  email: string
  password: string
}

const UserForm = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { mutateAsync } = trpc.useMutation('member.create-user')
  const initialValues: FormValues = {
    id: '',
    level: '',
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setSuccess(false)
      setError('')
      try {
        await mutateAsync(values)
        setSuccess(true)
      } catch (e) {
        setError((e as Error).message)
      }
    },
  })

  return (
    <Container centerContent className="mx-10">
      <Alert
        marginTop={5}
        hidden={!success && !error}
        status={success ? 'success' : 'error'}
      >
        <AlertIcon />
        <AlertTitle>
          {success ? 'Successful!' : 'Something went wrong'}
        </AlertTitle>
        <AlertDescription>
          {error ? error : 'User successfully created'}
        </AlertDescription>
      </Alert>

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

        <Input
          id="email"
          isRequired
          marginBottom={5}
          name="email"
          type="email"
          onChange={formik.handleChange}
          placeholder="Enter a email"
          value={formik.values.email}
          variant="outline"
        />

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

        <Button isLoading={formik.isSubmitting} type="submit">
          Create User
        </Button>
      </form>
    </Container>
  )
}

export default UserForm
