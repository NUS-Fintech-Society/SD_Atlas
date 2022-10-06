import type { NextPage } from 'next'
import { Input } from '@chakra-ui/react'
import { parse } from 'papaparse'

const DashboardPage: NextPage = () => {
  // Used to parse the csv file
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevents the page from refreshing
    e.preventDefault()

    // Parses the csv file
    if (e.target.files && e.target.files.length && e.target.files[0]) {
      parse(e.target.files[0], {
        header: true,
        complete(results) {
          console.log(results.data)
        },
      })
    }
  }

  // Used to return the components
  return <Input accept=".csv" onChange={handleFile} type="file" />
}

type Users = {
  name?: string
  email?: string
}

export default DashboardPage
