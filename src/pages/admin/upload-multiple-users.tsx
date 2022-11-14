import type { NextPage } from 'next'
import { Input } from '@chakra-ui/react'
import { parse, ParseResult } from 'papaparse'
import { trpc } from '~/utils/trpc'
import { Button } from '@chakra-ui/react'
import DataTable from '~/components/admin/DataTable'
import SidebarWithHeader from '~/components/admin/AdminSidebar'
import { add } from '~/store/admin/dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store/store'
import { AddUsersType, CSVType } from '~/store/types/admin.type'
import { MouseEvent } from 'react'

const DashboardPage: NextPage = () => {
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

  const clickHandler = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    try {
      e.preventDefault()
      if (!data.length) return
      mutateAsync(data)
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  return (
    <SidebarWithHeader>
      {data.length ? <DataTable /> : null}
      <Input accept=".csv" onChange={handleFile} type="file" />
      <Button isLoading={isLoading} onClick={clickHandler}>
        Submit File
      </Button>
    </SidebarWithHeader>
  )
}

export default DashboardPage
