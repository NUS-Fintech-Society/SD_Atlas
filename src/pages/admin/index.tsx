import type { NextPage } from 'next'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { parse, ParseResult } from 'papaparse'
import DataTable from '../../components/admin'

const DashboardPage: NextPage = () => {
  const [data, setData] = useState<itemType[]>([])

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
              'Full Name': item['Full Name'],
              'NUS email': item['NUS email (xxx@u.nus.edu)'],
              Gmail: item['Gmail'],
              'Telegram Handle(@xxx)': item['Telegram Handle(@xxx)'],
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
      <Input accept=".csv" onChange={handleFile} type="file" />
      <DataTable data={data} />
    </>
  )
}

export type itemType = {
  'Full Name': string
  'NUS email'?: string
  Gmail?: string
  'Telegram Handle(@xxx)'?: string
  'NUS email (xxx@u.nus.edu)'?: string
}

export default DashboardPage
