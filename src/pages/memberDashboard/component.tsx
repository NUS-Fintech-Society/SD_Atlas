import { trpc } from '../../utils/trpc'
import {
    Container,
    Input,
    Heading, 
    Text,
    Grid,
    GridItem,
    Avatar,
    Box
  } from '@chakra-ui/react'

export default function Members({roles}) {
    const{data: info} = trpc.useQuery(["memberdash.getAll",{roles: roles}])
  
    return (
            <Grid templateColumns='repeat(5,1fr)' gap='9'>
            {info?.map((m, j) => {
                return (
                    <GridItem colSpan={1} key={j}>
                      <Container centerContent padding='20px'>
                          <Avatar height='100px' width='100px'  src={m.image}/>
                          <Container centerContent paddingTop='20px'>
                          <Text fontSize='20px' color='#FFFFFF'>{m.name}</Text>
                          <Text fontSize='20px' color='#FFFFFF'>{m.batch}</Text>
                          </Container>
                  </Container>
                    </GridItem>
                );
              })}
              </Grid>
        );
      }