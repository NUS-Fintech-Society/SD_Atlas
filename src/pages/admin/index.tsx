import type { NextPage } from 'next'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { parse, ParseResult } from 'papaparse'
import { trpc } from '../../utils/trpc'
import { Button } from '@chakra-ui/react'

const DashboardPage: NextPage = () => {
  const mutation = trpc.useMutation(['admin.add-multiple-users'])
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
              department: item['Department'],
              discord:
                item[
                  'Discord ID (eg: _marcus#2873 please create an account if you do not have one as Discord will be one of our main forms of communication)'
                ],
              faculty: item['Faculty'],
              gender: item['Gender '] || 'Male',
              hobbies: item['Hobbies '] || '',
              name: item['Full Name'],
              nus_email: item['NUS email (xxx@u.nus.edu)'],
              personal_email: item['Gmail'],
              roles: item['Appointed Role '] || '',
              student_id: item['Student ID (AXXXXXXXX)'],
              telegram: item['Telegram Handle(@xxx)'],
              year: item['Year of Study (AY22/23)'],
            }
          })

          console.log('MAPPED: ', mapped)
          setData(mapped)
        },
      })
    }
  }

  // Used to return the components
  return (
    <>
      <Input accept=".csv" onChange={handleFile} type="file" />
      <Button
        isLoading={mutation.isLoading}
        onClick={async (e) => {
          try {
            e.preventDefault()
            if (!data.length) return
            console.log('HERE', data)
            await mutation.mutate(data)
            console.log('ENTERED HERE')
          } catch (e) {
            console.error(e)
          }
        }}
      >
        Submit File 000
      </Button>
    </>
  )
}

export type AddUsersType = {
  department: string
  discord: string
  faculty: string
  gender: string
  hobbies: string
  name: string
  nus_email: string
  personal_email: string
  roles: string
  student_id: string
  telegram: string
  year: string
}

export type CSVType = {
  'Full Name': string
  'Date of Birth': string
  'Gender ': string
  Race: string
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
