import { Text } from '@chakra-ui/react'

const Header = ({ name }: { name?: string | null }) => {
  return (
    <Text fontSize={['4xl', '3xl', '2xl']}>
      Welcome back, {name || 'Annonymous User'}!
    </Text>
  )
}

export default Header
