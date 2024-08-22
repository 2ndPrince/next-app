import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'Email'},
                password: {label: 'Password', type: 'password', placeholder: 'Password'}
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) return null;
                const user = await prisma.user.findUnique({where: {email: credentials.email}});
                if (!user) return null;

                const passwordsMatch = await bcript.compare(credentials.password, user.hashedPassword!);

                return passwordsMatch ? user : null;
            }
        })
    ],
    session: {
        strategy: 'jwt'
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};