import React from 'react';
import { trpc } from '../utils/trpc'

import {
  Box,
  Button,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Input,
  useDisclosure,
  Heading, 
  Text,
  Grid,
  GridItem,
  Avatar
} from '@chakra-ui/react'

// const Members = () => {
//     const{data: messages} = trpc.useQuery(["memberdash.getAll",{roles: 'Co-Directors'}])
  
//     return (
//       <div className="flex flex-col gap-4">
//         {messages?.map((msg, index) => {
//           return (
//             <div key={index}>
//               <h1>{msg.name}</h1>
//               <h2> {msg.batch}</h2>
//             </div>
//           );
//         })}
//       </div>
//     );      
//   }

  const ExcoMember = () => { 
    return (
      <Container centerContent padding='20px'>
          {/* Link : https://bit.ly/dan-abramov */}
              <Avatar height='100px' width='100px' bg='tomato' src='link'/>
              <Container centerContent paddingTop='20px'>
              <Text fontSize='25px' color='#FFFFFF'> Role </Text>
              <Text fontSize='20px' color='#FFFFFF'> Name </Text>
              <Text fontSize='20px' color='#FFFFFF'> Batch </Text>
              </Container>
      </Container>
    )
  }
  
  const Member = () => { 
    return (
      <Container centerContent padding='20px'>
          {/* Link : https://bit.ly/dan-abramov */}
              <Avatar height='100px' width='100px' bg='tomato' src='link'/>
              <Container centerContent paddingTop='20px'>
              <Text fontSize='20px' color='#FFFFFF'> Name </Text>
              <Text fontSize='20px' color='#FFFFFF'> Batch </Text>
              </Container>
      </Container>
    )
  }
  
  const ExcoBoard = () => { 
    return (
      <div>
        <Container centerContent paddingTop='20px'>
        <Text fontSize='40px' color='#FF9900' >EXCO</Text>
        </Container>
      
      <Grid height='600px' templateRows='repeat(2,1fr)' templateColumns='repeat(7,1fr)' gap='9' paddingTop='30px' paddingStart='150px' paddingEnd='150px'> 
            <GridItem colStart={2} colEnd={3}>
              <ExcoMember/>
            </GridItem>
            <GridItem colStart={4} colEnd={5}>
              <ExcoMember/>
            </GridItem>
            <GridItem colStart={6} colEnd={7}>
              <ExcoMember/>
            </GridItem>
            <GridItem rowStart={2} rowSpan={1} colSpan={1}>
              <ExcoMember/>
            </GridItem>
            <GridItem rowStart={2} rowSpan={1} colSpan={1}>
              <ExcoMember/>
            </GridItem>
            <GridItem rowStart={2} rowSpan={1} colSpan={1}>
              <ExcoMember/>
            </GridItem>
            <GridItem rowStart={2} rowSpan={1} colSpan={1}>
              <ExcoMember/>
            </GridItem>
            <GridItem rowStart={2} rowSpan={1} colSpan={1}>
              <ExcoMember/>
            </GridItem>
            <GridItem rowStart={2} rowSpan={1} colSpan={1}>
              <ExcoMember/>
            </GridItem>
            <GridItem rowStart={2} rowSpan={1} colSpan={1}>
              <ExcoMember/>
            </GridItem>
        </Grid>
        </div>
    )
  }
  
  const CDirectors = () => { 
    return (
      <Grid templateColumns='repeat(5,1fr)' gap='9'>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
              </Grid>
    )
  }
  
  const HoDesign = () => { 
    return (
      <Grid templateColumns='repeat(5,1fr)' gap='9'>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
              </Grid>
    )
  }
  
  const DManagers = () => { 
    return (
      <Grid templateColumns='repeat(5,1fr)' gap='9'>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
              </Grid>
    )
  }
  
  const UIUXDesigners = () => { 
    return (
      <Grid templateColumns='repeat(5,1fr)' gap='9'>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
              </Grid>
    )
  }

  const TechLeads = () => { 
    return (
      <Grid templateColumns='repeat(5,1fr)' gap='9'>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
              </Grid>
    )
  }

  const SoftwareEngineers = () => { 
    return (
      <Grid templateColumns='repeat(5,1fr)' gap='9'>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
              </Grid>
    )
  }

  const ProductManagers = () => { 
    return (
      <Grid templateColumns='repeat(5,1fr)' gap='9'>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
                <GridItem colSpan={1}>
                  <Member/>
                </GridItem>
              </Grid>
    )
  }

  const MemberBoard = () => { 
    return (
        <div>
        <Container centerContent paddingTop='20px'bg='black'>
        <Text fontSize='40px' color='#FF9900' >Software Development</Text>
        </Container>
  
          <Grid height='600px' templateRows='repeat(3,1fr)' templateColumns='repeat(7,1fr)' gap='9' paddingTop='30px' paddingStart='150px' paddingEnd='150px'>
            <GridItem colSpan={2} rowSpan={1} >
              <Container centerContent paddingTop='50px'>
                <Text fontSize='30px' color='#FFFFFF'>Co-Directors</Text>
              </Container>
            </GridItem>
            <GridItem colSpan={5} rowSpan={1}>
              <CDirectors/>
            </GridItem>
  
            <GridItem colSpan={2} rowSpan={1} >
              <Container centerContent paddingTop='50px'>
                <Text fontSize='30px' color='#FFFFFF'>Head of Design</Text>
              </Container>
            </GridItem>
            <GridItem colSpan={5} rowSpan={1}>
              <HoDesign/>
            </GridItem>
  
            <GridItem colSpan={2} rowSpan={1} >
              <Container centerContent paddingTop='50px'>
                <Text fontSize='30px' color='#FFFFFF'>Design Managers</Text>
              </Container>
            </GridItem>
            <GridItem colSpan={5} rowSpan={1}>
              <DManagers/>
            </GridItem>
  
            <GridItem colSpan={2} rowSpan={1} >
              <Container centerContent paddingTop='50px'>
                <Text fontSize='30px' color='#FFFFFF'>UI/UX Designers</Text>
              </Container>
            </GridItem>
            <GridItem colSpan={5} rowSpan={1}>
              <UIUXDesigners/>
            </GridItem>

            <GridItem colSpan={2} rowSpan={1} >
              <Container centerContent paddingTop='50px'>
                <Text fontSize='30px' color='#FFFFFF'>Tech Leads</Text>
              </Container>
            </GridItem>
            <GridItem colSpan={5} rowSpan={1}>
              <TechLeads/>
            </GridItem>

            <GridItem colSpan={2} rowSpan={1} >
              <Container centerContent paddingTop='50px'>
                <Text fontSize='30px' color='#FFFFFF'>Software Engineers</Text>
              </Container>
            </GridItem>
            <GridItem colSpan={5} rowSpan={1}>
              <SoftwareEngineers/>
            </GridItem>

            <GridItem colSpan={2} rowSpan={1} >
              <Container centerContent paddingTop='50px'>
                <Text fontSize='30px' color='#FFFFFF'>Product Managers</Text>
              </Container>
            </GridItem>
            <GridItem colSpan={5} rowSpan={1}>
              <ProductManagers/>
            </GridItem>
          </Grid> 
          </div>
        
    )
  }


export default function dashboard() {
    return(
        <div>
            {/* <div className = "h-48 grid grid-cols-7 grid-rows-1 gap-4">
                <div className = " col-span-2 flex justify-center items-center">
                    <p className = "text-3xl">Co-Directors</p></div>
                <div className = "flex flex-col justify-center items-center">
                <Avatar name='Dan Abrahmov' size='xl' src='https://bit.ly/dan-abramov' />
                <p className= 'text-xl'>name</p>
                <p>batch</p>
                </div>
            </div> */}
          
            <Grid  templateColumns='repeat(6,1fr)' >
              <GridItem colStart={3} colEnd={5}>
              <Container centerContent>
              <Heading fontSize='56px'> Our Members </Heading>
              </Container >
              </GridItem>
              <GridItem colSpan={2}>
              <Container centerContent paddingTop='20px'>
              <Input borderRadius='10px' placeholder='Search' borderColor='#FF9900' size='sm' htmlSize={35} width='auto'/>
              </Container >
              </GridItem>
            </Grid>
          
          
  
          <ExcoBoard/>
          <MemberBoard/>
        </div>
    )
}