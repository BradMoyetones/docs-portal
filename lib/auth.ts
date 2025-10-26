// src/auth.ts
import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the login page
            name: "Credentials",
            credentials: {
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter password",
                },
            },
            async authorize(credentials, _request) {
                // Add logic to verify the password
                if (credentials?.password === process.env.APP_PASSWORD) {
                    // Any object returned will be saved in the `user` property of the JWT
                    return { id: "admin", name: "Admin" };
                }
                // You can also reject the login by returning null
                return null;
            },
        }),
    ],
    // Add any other necessary options, like pages or callbacks
    pages: {
        signIn: "/auth/signin", // Tu página de login personalizada
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        },
        session({ session, user }) {
            if (user?.id) {
                session.user.id = user.id;
            }
            return session;
        }
    },
    jwt: {
        maxAge: 1 * 24 * 60 * 60
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60
    }
};

export const getSession = async() => await getServerSession(authOptions)