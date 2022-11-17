import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { trpc } from '~/utils/trpc'

const ProjectTable = () => {
  const { isLoading, data } = trpc.useQuery(['user.getUserProjects'])

  // Used to render the projects
  const render = () => {
    return data?.projects.map((project) => (
      <Tr key={project.project_id}>
        <Td>{project.name}</Td>
        <Td>{project.team_lead}</Td>
      </Tr>
    ))
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
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
      )}
    </>
  )
}

export default ProjectTable
