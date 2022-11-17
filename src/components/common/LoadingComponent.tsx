import { VStack, Spinner, Text } from '@chakra-ui/react'

const LoadingComponent = ({ text }: { text: string }) => {
  return (
    <VStack>
      <Spinner
        className="shrink-0 mb-2"
        label="Loading..."
        size="xl"
        thickness="4px"
      />
      <Text fontSize="xl">{text}</Text>
    </VStack>
  )
}

export default LoadingComponent
