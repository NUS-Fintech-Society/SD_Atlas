import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  Flex,
  InputGroup,
  Input,
  InputRightAddon,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import styles from './index.module.css'

const ForgotPasswordPage = () => {
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
              <Flex
                alignItems="center"
                mb={8}
                alignSelf="stretch"
                justifyContent="space-between"
              >
                <Link href="/signin">
                  <a>
                    <ArrowBackIcon boxSize={8} />
                  </a>
                </Link>
                <Heading textAlign="center" alignSelf="center" size="2xl">
                  Forgot Password
                </Heading>
                <div></div>
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
