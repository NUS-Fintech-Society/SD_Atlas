import type { NextPage } from 'next'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { parse, ParseResult } from 'papaparse'
import DataTable from '../../components/admin/DataTable'

const DashboardPage: NextPage = () => {
  const [data, setData] = useState<tableDataType[]>([])

  // Used to parse the csv file
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevents the page from refreshing
    e.preventDefault()

    // Parses the csv file
    if (e.target.files && e.target.files.length && e.target.files[0]) {
      parse(e.target.files[0], {
        header: true,
        complete(results: ParseResult<itemType>) {
          const mapped = results.data.map((item) => {
            return {
              name: item['Full Name'] || '',
              email: item['NUS email (xxx@u.nus.edu)'] || item['Gmail'],
              telegram: item['Telegram Handle(@xxx)'],
            }
          })
          setData(mapped)
        },
      })
    }
  }

  // Used to return the components
  return (
    <>
      <DataTable data={data} />
      <Input accept=".csv" onChange={handleFile} type="file" />
    </>
  )
}

export type tableDataType = {
  name?: string
  email?: string
  telegram?: string
}

type itemType = {
  'Full Name': string
  'NUS email (xxx@u.nus.edu)'?: string
  Gmail?: string
  'Telegram Handle(@xxx)'?: string
}

export default DashboardPage
