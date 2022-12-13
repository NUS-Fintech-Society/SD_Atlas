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
import { DataTable, columns } from './DataTable'
import { trpc } from '../../utils/trpc'
import { useSession } from "next-auth/react";
import React, { useState } from 'react';
//TODO: Make the form submit stuff
//https://chakra-ui.com/docs/components/form-control
//https://chakra-ui.com/docs/components/checkbox
const EventPage = () => {
  const{data: data} = trpc.useQuery(["create-event.getAll"])
  const members: Record<string, unknown>[] = []
  const { data: session, status } = useSession();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDepart, setEventDepart] = useState([]);
  const attendees = ['abc','dsd','fgh','hhh'] //replace with datatable input later
  const newEvent = trpc.useMutation("create-event.createEvent");
  if (!data) {
    return <div>Loading...</div>
  } else {
    {data?.map((p,i) => { // can add a id col to uniquely identify the member?
      members.push({
        department: p.department,
        role: p.roles,
        name: p.name
      })
    })}
  return (
    <div className="h-fill bg-black text-white items-center">
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-2xl text-center text-[#FF9900] mb-10">
          Create New Event
        </h1>
        <FormControl>
          <VStack align="left" spacing="6">
            <div>
              <FormLabel>Event Name</FormLabel>
              <Input type="text" value = {eventName}
              onChange={(event) => setEventName(event.target.value)}
              />
            </div>
            <div className="flex">
              <FormLabel>Department</FormLabel>
              <CheckboxGroup
                colorScheme="green"
                value = {eventDepart}
                onChange={(event) => setEventDepart(event)}
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
                type="date"
                value = {eventDate}
                onChange={(event) => setEventDate(event.target.value)}
              />
            </div>
            <div className="flex ">
              <FormLabel>QR Code required</FormLabel>
              <Checkbox></Checkbox>
            </div>
            <div>
              <DataTable columns={columns} data={members} />
            </div>
            <div className="flex justify-between">
              <Button bgColor="#FF9900" width={150} textColor="black">
                Back
              </Button>
              <Button bgColor="#4365DD" width={150} onClick = {(event) => {
                  event.preventDefault();

                  newEvent.mutate({
                    name: eventName,
                    date: new Date(eventDate),
                    departments:eventDepart,
                    attendees:attendees,
                  });

                  setEventName("")
                  setEventDate("")
                  setEventDepart([])
                  alert('A new event is successfully created!')
                }}>
                Create Event
              </Button>
            </div>
          </VStack>
        </FormControl>
      </div>
    </div>
  )
}
}
export default EventPage
