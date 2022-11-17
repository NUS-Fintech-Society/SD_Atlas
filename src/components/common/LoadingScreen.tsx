import { Spinner, Flex } from '@chakra-ui/react'

// Loading Screen Only
const LoadingScreen = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Spinner
        className="shrink-0"
        size="xl"
        label="Loading..."
        thickness="4px"
      />
    </Flex>
  )
}

export default LoadingScreen
