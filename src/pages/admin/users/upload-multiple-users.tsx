import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { useToast, VStack, Input, Stack, Button } from '@chakra-ui/react'
import { parse, ParseResult } from 'papaparse'
import { trpc } from '~/utils/trpc'
import DataTable from '~/components/admin/user/DataTable'
import { add } from '~/store/admin/dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store/store'
import { AddUsersType, CSVType } from '~/store/types/admin.type'
import { MouseEvent } from 'react'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'

const DashboardPage: NextPage = () => {
  const toast = useToast()
  const data = useSelector<RootState, AddUsersType[]>(
    (state) => state.dashboard
  )

  const dispatch = useDispatch()
  const { isLoading, mutateAsync } = trpc.useMutation([
    'member.add-multiple-users',
  ])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length && e.target.files[0]) {
      parse(e.target.files[0], {
        header: true,
        complete: (results: ParseResult<CSVType>) => dispatch(add(results)),
      })
    }
  }

  const clickHandler = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    try {
      e.preventDefault()
      if (!data.length) return
      await mutateAsync(data)
      toast({
        title: 'Successfully Added!',
        description: 'You have successfully added all the users',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      toast({
        title: 'Something went wrong',
        description: (e as Error).message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack>
      {data.length ? <DataTable /> : null}
      <Stack direction={['row', 'column']}>
        <Input accept=".csv" onChange={handleFile} type="file" />
        <Button
          bg="pink.200"
          disabled={!data.length}
          isLoading={isLoading}
          onClick={clickHandler}
        >
          Submit File
        </Button>
      </Stack>
    </VStack>
  )
}

export default DashboardPage

// This is used to protect this route.
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
