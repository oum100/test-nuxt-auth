import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,

    pages:{
        signIn: "/login",
    },

    providers: [
        //@ts-expect-error
        GithubProvider.default({
            clientId:  useRuntimeConfig().public.GITHUB_CLIENT_ID,
            clientSecret: useRuntimeConfig().GITHUB_CLIENT_SECRET
        }),

        //@ts-expect-error
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
                password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
            },

            authorize (credentials: any) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
        
                const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2' }
        
                if (credentials?.username === user.username && credentials?.password === user.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    console.log(user)
                    return user
                } else {
                    console.error('Warning: Malicious login attempt registered, bad credentials provided')
            
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
            
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }

            
        }),
    ]
})