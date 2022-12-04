import type { NextPage } from 'next'
import { useFormik } from 'formik'
import { trpc } from '~/utils/trpc'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingScreen from '~/components/LoadingGif'
import { useToast } from '@chakra-ui/react'
import Screen from '~/components/mobile/Screen'
import Button from '~/components/utility/Button'

const CreateAnnouncementPage: NextPage = () => {
  type FormValues = {
    department: string
    content: string
    title: string
  }

  const initialValues: FormValues = {
    content: '',
    department: '',
    title: '',
  }

  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  const toast = useToast()
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async ({ content, title }) => {
      try {
        await mutateAsync({ content, title })
        toast({
          description: 'Announcement successfully created',
          duration: 3000,
          status: 'success',
          title: 'New Announcement Made!',
        })
      } catch (e) {
        toast({
          description: (e as Error).message,
          duration: 3000,
          status: 'error',
          title: 'Something Went Wrong!',
        })
      }
    },
  })
  const { isLoading, mutateAsync } = trpc.useMutation(
    'announcement.create-announcement'
  )

  if (status === 'loading') return <LoadingScreen />
  if (session.level !== 'super') router.push('/user')

  return (
    <Screen>
      <div className="flex flex-col justify-evenly">
        <h1 className="font-bold text-3xl my-2">Create Announcement</h1>

        <p className="my-2">
          Simply create an announcement now and let everyone know! Fill in the
          title and content and click submit
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="mb-3 px-2 py-1 focus:outline-blue-500 min-w-full border-gray-300 border border-solid rounded-lg"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Enter a title"
            required
          />

          <textarea
            id="content"
            className="px-2 py-1 mb-3 focus:outline-blue-500 min-w-full border-gray-300 border border-solid rounded-lg"
            maxLength={500}
            name="content"
            value={values.content}
            onChange={handleChange}
            placeholder="Enter a content"
            required
          />
          <Button disabled={!values.content || !values.title} type="submit">
            Create Announcement
          </Button>
        </form>
      </div>
    </Screen>
  )
}

export default CreateAnnouncementPage
