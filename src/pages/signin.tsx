import {
  Box,
  Heading,
  Flex,
  Link as ChakraLink,
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

function ChakraNextLink({
  href,
  children,
  ...props
}: {
  href: string
  children: React.ReactNode
} & typeof ChakraLink['defaultProps']) {
  return (
    <Link href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </Link>
  )
}

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
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
              <Heading mb={8} textAlign="center" alignSelf="center" size="2xl">
                Login
              </Heading>
              <FormControl>
                <FormLabel>NUS Email</FormLabel>
                <InputGroup>
                  <Input type="email" />
                  <InputRightAddon>@u.nus.edu</InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl mt={4} id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <ChakraNextLink mt={4} href="/forgot-password">
                Forgot your password?
              </ChakraNextLink>
              <Button
                mt={8}
                size="lg"
                isLoading={false}
                type="submit"
                alignSelf="stretch"
              >
                Sign In
              </Button>
            </Flex>
          </Box>
        </div>
      </div>
    </>
  )
}

export default SignInPage
