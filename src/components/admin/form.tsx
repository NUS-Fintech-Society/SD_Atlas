import { trpc } from '../../utils/trpc'
import { useFormik } from 'formik'
import { Button, Input, Select } from '@chakra-ui/react'

interface FormValues {
  id: string
  level: string
  email: string
  password: string
}

const UserForm = () => {
  const { mutateAsync } = trpc.useMutation('member.create-user')
  const initialValues: FormValues = {
    id: '',
    level: '',
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => mutateAsync(values),
  })

  return (
    <form className="m-4" onSubmit={formik.handleSubmit}>
      <Input
        className="my-2"
        id="id"
        isRequired
        name="id"
        onChange={formik.handleChange}
        placeholder="Enter the student id"
        value={formik.values.id}
        variant="outline"
      />

      <Input
        className="my-2"
        id="email"
        isRequired
        name="email"
        type="email"
        onChange={formik.handleChange}
        placeholder="Enter a email"
        value={formik.values.email}
        variant="outline"
      />

      <Input
        className="my-2"
        id="password"
        isRequired
        name="password"
        type="password"
        onChange={formik.handleChange}
        placeholder="Enter a password"
        value={formik.values.password}
        variant="outline"
      />

      <Select
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

      <Button type="submit">Create User</Button>
    </form>
  )
}

export default UserForm
