import Link from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'

export default function ChakraNextLink({
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
