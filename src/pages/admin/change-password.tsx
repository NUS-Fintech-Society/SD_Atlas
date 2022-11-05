import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import { trpc } from '../../utils/trpc'
import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Button,
  Container,
  Input,
} from '@chakra-ui/react'
import SidebarWithHeaders from '../../components/admin/CSV/AdminSidebar'

interface FormValue {
  current: string
  updated: string
}

const initialValues: FormValue = {
  current: '',
  updated: '',
}

export default function ChangePasswordPage() {
  const { mutateAsync } = trpc.useMutation('member.change-password')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session } = useSession({ required: true })

  // If the user does not have the neccessary authentication level, push him to home page
  if (session && session.level !== 'super') router.push('/')

  const { handleChange, handleSubmit, isSubmitting, values } = useFormik({
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
    <SidebarWithHeaders>
      <Container centerContent className="mx-10">
        <Alert
          marginTop={5}
          hidden={!success && !error}
          status={success ? 'success' : 'error'}
        >
          <AlertIcon />
          <AlertTitle>
            {success ? 'Successfully Updated!' : 'Something went wrong'}
          </AlertTitle>
          <AlertDescription>
            {error ? error : 'Password successfully changed'}
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <Input
            id="current"
            isRequired
            marginY={5}
            name="current"
            onChange={handleChange}
            placeholder="Enter the current password"
            type="password"
            value={values.current}
            variant="outline"
          />

          <Input
            id="updated"
            isRequired
            marginBottom={5}
            name="updated"
            type="password"
            onChange={handleChange}
            placeholder="Enter the new password"
            value={values.updated}
            variant="outline"
          />

          <Button isLoading={isSubmitting} type="submit">
            Create User
          </Button>
        </form>
      </Container>
    </SidebarWithHeaders>
  )
}
