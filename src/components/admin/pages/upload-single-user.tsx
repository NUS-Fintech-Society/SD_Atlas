import { trpc } from '../../../utils/trpc'
import { useFormik } from 'formik'
import { Button, Container, Input, Select, useToast } from '@chakra-ui/react'

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

      <Button bg="gray.300" isLoading={formik.isSubmitting} type="submit">
        Create User
      </Button>
    </form>
  )
}

export default UserForm
