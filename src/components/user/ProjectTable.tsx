import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from '@chakra-ui/react'
import Link from 'next/link'
import { trpc } from '~/utils/trpc'

const ProjectTable = () => {
  const { isLoading, data } = trpc.useQuery(['user.getUserProjects'])

  // Used to render the projects
  const render = () => {
    if (isLoading) return <h1>Loading...</h1>

    return data?.projects.map((project) => (
      <Tr key={project.project_id}>
        <Td>{project.name}</Td>
        <Td>{project.team_lead}</Td>
      </Tr>
    ))
  }

  return (
    <>
      <Heading>Projects</Heading>
      {data && data.projects && data.projects.length ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Project Name</Th>
                <Th>Project Lead</Th>
              </Tr>
            </Thead>
            <Tbody>{render()}</Tbody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Link href="/projects">
            <Button>Join a project</Button>
          </Link>
        </>
      )}
    </>
  )
}

export default ProjectTable
