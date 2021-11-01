import NextAuth, { Theme } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  theme: {
    colorScheme: 'light',
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
    brandColor: '#dedede',
  },
  debug: true,
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
          required: true,
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        //   const { email, password } = credentials;
        try {
          const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            return null;
          }

          const user = await res.json();
          // const user = {
          //   name: 'Code',
          //   email: 'code@dev.team',
          //   image: 'https://avatars.githubusercontent.com/u/7415984?v=4',
          // };

          if (user) {
            console.log(user);
            return user;
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    GithubProvider({
      id: 'github',
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
