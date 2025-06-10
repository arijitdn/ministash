import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "@repo/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
        oauth: {},
      },
      authorize: async (credentials) => {
        if (credentials.oauth) {
          const data = await db.oAuthToken.findFirst({
            where: {
              token: credentials.oauth,
            },
          });

          if (!data) return null;

          const oAuthUser = await db.user.findFirst({
            where: {
              email: data.email,
            },
          });

          if (!oAuthUser) return null;

          await db.oAuthToken.delete({
            where: {
              token: data.token,
            },
          });

          return oAuthUser;
        } else {
        }
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await db.user.findFirst({
            where: {
              email: credentials.email,
              provider: "CREDENTIALS",
            },
          });

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password as string
          );
          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              name: user.name,
              email: user.email!,
              imageUrl: user.image ?? "",
              password: "no_pass_google_account",
              provider: "GOOGLE",
              verified: true,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        const sessionId = crypto.randomUUID();

        await db.session.create({
          data: {
            sessionId,
            email: user.email!,
          },
        });

        token.sessionId = sessionId;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.sessionId = token.sessionId as string | undefined;
      return session;
    },
  },
});
