import {
  Box,
  Heading,
  Flex,
  Icon,
  InputGroup,
  Input,
  InputRightAddon,
  FormControl,
  FormLabel,
  Button,
  Spacer,
} from '@chakra-ui/react'
import { BsArrowLeftShort } from 'react-icons/bs'
import styles from './index.module.css'

import Head from 'next/head'
import ChakraNextLink from '../components/ChakraNextLink'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const ForgotPasswordPage = () => {
  const router = useRouter()
  const session = useSession()

  if (session.status === 'authenticated') router.push('/profile')

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>
          <Box
            p={8}
            w="100%"
            maxWidth="768px"
            borderWidth={1}
            borderRadius={16}
            boxShadow="lg"
            _hover={{ boxShadow: '2xl' }}
            transition="all 1s"
          >
            <Flex flexDirection="column" alignItems="start">
              <Flex mb={8} w="100%" alignItems="center" justifyContent="center">
                <ChakraNextLink href="/login" flex={1}>
                  <Icon as={BsArrowLeftShort} boxSize={12} />
                </ChakraNextLink>
                <Heading as="h1" size="2xl" textAlign="center">
                  Forgot Password
                </Heading>
                <Spacer></Spacer>
              </Flex>
              <FormControl>
                <FormLabel>NUS Email</FormLabel>
                <InputGroup>
                  <Input type="email" />
                  <InputRightAddon>@u.nus.edu</InputRightAddon>
                </InputGroup>
              </FormControl>
              <Button
                mt={10}
                size="lg"
                isLoading={false}
                type="submit"
                alignSelf="stretch"
              >
                Send Reset Link
              </Button>
            </Flex>
          </Box>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordPage
