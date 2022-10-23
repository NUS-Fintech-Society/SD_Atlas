import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'

import { prisma } from '../../../server/db/client'
import { env } from '../../../env/server.mjs'
import { User } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  callbacks: {
    // We need this to ensure that the client knows when to log in
    async session({ session, token }) {
      if (session && session.user && token && token.sub) {
        session.user.id = token.sub
      }

      if (token) {
        session.level = token.level
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        token.level = user.level
      }
      return token
    },
  },

  providers: [
    Credentials({
      name: 'NUS Email',
      credentials: {
        email: {
          label: 'NUS Email',
          type: 'email',
          placeholder: 'XXX@u.nus.edu',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credential) => {
        // Step 1: If no credentials are provided, return null.
        if (!credential || !credential.email || !credential.password) {
          return null
        }

        // Step 2: Destructure and get the email and password.
        const { email, password } = credential

        try {
          // // Step 3: Get the user by the email
          const adapterUser = await prisma.user.findUnique({
            where: { email },
          })
          if (!adapterUser) return null
          // Step 4: Type cast it to the type of User
          const account = adapterUser as User
          // If the account is found, challenge the hashPassword with the password
          const success = await compare(password, account.hashedPassword)
          if (!success) return null
          // The user object is passed to the session callback
          return {
            id: account.id,
            email: account.email,
            level: account.level,
          }
        } catch (e) {
          return null
        }
      },
    }),
  ],

  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },

  // Used to decorate the home page design
  theme: {
    colorScheme: 'dark',
    logo: '/fintech_logo_final-removebg_white.png',
  },
}

export default NextAuth(authOptions)
