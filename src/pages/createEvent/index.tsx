import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  Stack,
  VStack,
  Button,
} from '@chakra-ui/react'
import { DataTable, data, columns } from './DataTable'
//TODO: Make the form submit stuff
//https://chakra-ui.com/docs/components/form-control
//https://chakra-ui.com/docs/components/checkbox
const EventPage = () => {
  return (
    <div className="h-fill bg-black text-white items-center">
      <div className="max-w-3xl mx-auto p-10">
        <h1 className="text-2xl text-center text-[#FF9900] mb-10">
          Create New Event
        </h1>
        <FormControl>
          <VStack align="left" spacing="6">
            <div>
              <FormLabel>Event Name</FormLabel>
              <Input type="email" />
            </div>
            <div className="flex">
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
            <div className="flex ">
              <FormLabel>QR Code required</FormLabel>
              <Checkbox></Checkbox>
            </div>
            <div>
              <DataTable columns={columns} data={data} />
            </div>
            <div className="flex justify-between">
              <Button bgColor="#FF9900" width={150} textColor="black">
                Back
              </Button>
              <Button bgColor="#4365DD" width={150}>
                Create Event
              </Button>
            </div>
          </VStack>
        </FormControl>
      </div>
    </div>
  )
}
export default EventPage
