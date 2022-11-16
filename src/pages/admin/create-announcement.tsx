import type { NextPage, NextApiRequest, NextApiResponse } from 'next'
import { useFormik } from 'formik'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { VStack, useToast } from '@chakra-ui/react'
import { trpc } from '~/utils/trpc'
import { Button, Input, Textarea, Heading, Text } from '@chakra-ui/react'

const CreateAnnouncementPage: NextPage = () => {
  const { isLoading, mutateAsync } = trpc.useMutation(
    'announcement.create-announcement'
  )
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
  return (
    <VStack>
      <Heading>Create An Announcement</Heading>

      <Text variant="xl">
        Simply create an announcement now and let everyone know! Fill in the
        title and content and click submit
      </Text>

      <form onSubmit={handleSubmit}>
        <Input
          id="title"
          marginBottom={10}
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter a title"
          required
        />

        <Textarea
          id="content"
          marginBottom={10}
          maxLength={500}
          name="content"
          value={values.content}
          onChange={handleChange}
          placeholder="Enter a content"
          required
        />
        <Button bg="gray.400" isLoading={isLoading} type="submit">
          Create Announcement
        </Button>
      </form>
    </VStack>
  )
}

export default CreateAnnouncementPage

// Route Protection Logic
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
