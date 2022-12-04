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
  useToast,
} from '@chakra-ui/react'
import styles from '../index.module.css'
import { useState } from 'react'
import Head from 'next/head'
import ChakraNextLink from '~/components/ChakraNextLink'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import LoadingScreen from '~/components/LoadingGif'

type FormValue = {
  email: string
  password: string
}

const initialValues: FormValue = {
  email: '',
  password: '',
}

const Login = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [show, setShow] = useState(false)
  const toast = useToast()
  const handleShowPassword = () => setShow(!show)

  const { handleSubmit, isSubmitting, handleChange, values } = useFormik({
    initialValues,
    onSubmit: async ({ email, password }) => {
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      })

      if (res && res.error) {
        toast({
          title: 'Error while logging in',
          description: res.error as string,
          status: 'error',
          isClosable: true,
          duration: 9000,
        })
        return
      }
    },
  })

  if (status === 'loading') return <LoadingScreen />
  if (status === 'authenticated') {
    if (session.level === 'admin') router.push('/admin')
    router.push('/user')
  }

  // If the user is not authenticated and is on this page, show the sign in form
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
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
              <form onSubmit={handleSubmit}>
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

                  <FormControl>
                    <FormLabel>NUS Email</FormLabel>
                    <InputGroup>
                      <Input
                        id="email"
                        isRequired
                        name="email"
                        onChange={handleChange}
                        type="text"
                        value={values.email}
                      />
                      <InputRightAddon>@u.nus.edu</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        isRequired
                        name="password"
                        type={show ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange}
                      />
                      <InputRightElement width="4.5rem">
                        <Button size="sm" onClick={handleShowPassword}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <ChakraNextLink
                    href="/auth/forgot-password"
                    mt={4}
                    textDecoration="underline"
                  >
                    Forgot your password?
                  </ChakraNextLink>
                  <Button
                    isLoading={isSubmitting}
                    mt={8}
                    size="lg"
                    type="submit"
                    alignSelf="stretch"
                  >
                    Sign In
                  </Button>
                </Flex>
              </form>
            </Box>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Login
