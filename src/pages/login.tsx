import {
  Box,
  Heading,
  Flex,
  InputGroup,
  Input,
  InputRightAddon,
  InputRightElement,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useDisclosure,
  CloseButton,
} from '@chakra-ui/react'
import styles from './index.module.css'

import React from 'react'
import Head from 'next/head'
import ChakraNextLink from '../components/ChakraNextLink'

import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

const Login = () => {
  const router = useRouter()
  const session = useSession()

  if (session.status === 'authenticated') router.push('/profile')

  const [show, setShow] = React.useState(false)
  const handleShowPassword = () => setShow(!show)

  const [userInfo, setUserInfo] = React.useState({
    email: '',
    password: '',
  })

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false })
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: '/',
      redirect: false,
    })

    if (res) {
      if (res.error) {
        onOpen()
        setErrorMessage(res.error)
      } else {
        router.push('/')
      }
    }
  }

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
            <form
              action="/api/auth/signin"
              method="post"
              onSubmit={handleSubmit}
            >
              <Flex flexDirection="column" alignItems="start">
                <Heading
                  as="h1"
                  size="2xl"
                  mb={8}
                  textAlign="center"
                  alignSelf="center"
                >
                  Login
                </Heading>
                {isVisible && (
                  <Alert status="error" borderRadius={10} mb={8}>
                    <AlertIcon />
                    <AlertTitle>{errorMessage}!</AlertTitle>
                    <AlertDescription>
                      Remember not to enter &quot;@u.nus.edu&quot; yourself
                    </AlertDescription>
                    <CloseButton
                      position="absolute"
                      right={1}
                      top={2}
                      onClick={onClose}
                    />
                  </Alert>
                )}
                <FormControl>
                  <FormLabel>NUS Email</FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                    />
                    <InputRightAddon>@u.nus.edu</InputRightAddon>
                  </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? 'text' : 'password'}
                      value={userInfo.password}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Button size="sm" onClick={handleShowPassword}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <ChakraNextLink
                  href="/forgot-password"
                  mt={4}
                  textDecoration="underline"
                >
                  Forgot your password?
                </ChakraNextLink>
                <Button mt={8} size="lg" type="submit" alignSelf="stretch">
                  Sign In
                </Button>
              </Flex>
            </form>
          </Box>
        </div>
      </div>
    </>
  )
}

export default Login
