import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { DataTable, data, columns } from './DataTable'
//https://chakra-ui.com/docs/components/form-control
//https://chakra-ui.com/docs/components/checkbox
const EventPage = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl">Create new event</h1>
      <FormControl>
        <VStack align="left" spacing="6">
          <div>
            <FormLabel>Event Name</FormLabel>
            <Input type="email" />
          </div>
          <div>
            <FormLabel>Department</FormLabel>
            <CheckboxGroup
              colorScheme="green"
              defaultValue={['naruto', 'kakashi']}
            >
              <Stack spacing={[1, 5]} direction={['row', 'column']}>
                <Checkbox value="naruto">Naruto</Checkbox>
                <Checkbox value="sasuke">Sasuke</Checkbox>
                <Checkbox value="kakashi">Kakashi</Checkbox>
              </Stack>
            </CheckboxGroup>
          </div>
          <div>
            <FormLabel>Date</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
          </div>
          <div>
            <FormLabel>QR Code required</FormLabel>
            <Checkbox value="kakashi">Kakashi</Checkbox>
          </div>
          <div>
            <FormLabel>Required attendees:</FormLabel>
            <DataTable columns={columns} data={data} />
          </div>
        </VStack>
      </FormControl>
    </div>
  )
}
export default EventPage
