import type { NextPage } from 'next'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { parse, ParseResult } from 'papaparse'
import { trpc } from '../../../utils/trpc'
import { Button } from '@chakra-ui/react'
import DataTable from './DataTable'

const DashboardPage: NextPage = () => {
  const { isLoading, mutateAsync } = trpc.useMutation([
    'member.add-multiple-users',
  ])
  const [data, setData] = useState<AddUsersType[]>([])

  // Used to parse the csv file
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevents the page from refreshing
    e.preventDefault()

    // Parses the csv file
    if (e.target.files && e.target.files.length && e.target.files[0]) {
      parse(e.target.files[0], {
        header: true,
        complete(results: ParseResult<CSVType>) {
          const mapped: AddUsersType[] = results.data.map((item) => {
            return {
              date_of_birth: item['Date of Birth'] || '',
              department: item['Department'] || '',
              diet:
                item['Dietary Restrictions (eg. Allergic to seafood)'] || '',
              discord:
                item[
                  'Discord ID (eg: _marcus#2873 please create an account if you do not have one as Discord will be one of our main forms of communication)'
                ],
              faculty: item['Faculty'] || '',
              gender: item['Gender '] || 'Male',
              hobbies: item['Hobbies '] || '',
              linkedin:
                item['LinkedIn profile LINK (eg. www.linkedin.com/in/XXX)'],
              major: item['Major and Specialization (if any)'] || '',
              name: item['Full Name'],
              nus_email: item['NUS email (xxx@u.nus.edu)'],
              personal_email: item['Gmail'],
              phone: item['Phone Number'],
              race: item['Race '] || '',
              roles: item['Appointed Role '] || '',
              shirt: item['Shirt size'],
              student_id: item['Student ID (AXXXXXXXX)'],
              telegram: item['Telegram Handle(@xxx)'],
              year: item['Year of Study (AY22/23)'],
            }
          })

          setData(mapped)
          console.log(mapped)
        },
      })
    }
  }

  // Used to return the components
  return (
    <>
      <DataTable data={data} />
      <Input accept=".csv" onChange={handleFile} type="file" />
      <Button
        isLoading={isLoading}
        onClick={async (e) => {
          try {
            e.preventDefault()
            if (!data.length) return
            mutateAsync(data)
          } catch (e) {
            console.error((e as Error).message)
          }
        }}
      >
        Submit File
      </Button>
    </>
  )
}

export type AddUsersType = {
  date_of_birth: string
  department: string
  discord: string
  diet: string
  faculty: string
  gender: string
  hobbies: string
  linkedin: string
  major: string
  name: string
  nus_email: string
  personal_email: string
  phone: string
  race: string
  roles: string
  shirt: string
  student_id: string
  telegram: string
  year: string
}

export type CSVType = {
  'Full Name': string
  'Date of Birth': string
  'Gender ': string
  'Race ': string
  Faculty: string
  'Major and Specialization (if any)': string
  'Year of Study (AY22/23)': string
  Department: string
  'Appointed Role ': string
  Gmail: string
  'NUS email (xxx@u.nus.edu)': string
  'Student ID (AXXXXXXXX)': string
  'Phone Number': string
  'Telegram Handle(@xxx)': string
  'Discord ID (eg: _marcus#2873 please create an account if you do not have one as Discord will be one of our main forms of communication)': string
  'LinkedIn profile LINK (eg. www.linkedin.com/in/XXX)': string
  'Dietary Restrictions (eg. Allergic to seafood)': string
  'Shirt size': string
  'Hobbies ': string
}

export default DashboardPage
