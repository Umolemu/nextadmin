import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authConfig"
import { connectToDb } from "./lib/utils"
import bcrypt from "bcrypt";
import { User } from "./lib/models";

const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) throw new Error("Wrong credentials!");

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
            );

            if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to login");
    }
}

export const {signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
            const user = await login(credentials);
            return user;
        } catch (error) {
            return null
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
        if(user) {
            token.name = user.name;
            token.isAdmin = user.isAdmin || "No";
            token.isManager = user.isManager || "No";
        }
        return token;
    },
    async session({session, token}) {
        if(token) {
            session.user.name = token.name;
            session.user.isAdmin = token.isAdmin;
            session.user.isManager = token.isManager;

        }
        return session;
    },
  }
})