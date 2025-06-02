import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import db from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  events: {
    async signIn(message) {
      const data = await db.billing.findFirst({
        where: {
          userId: message.user.id!,
        },
      });

      if (!data) {
        await db.billing.create({
          data: {
            userId: message.user.id!,
            email: message.user.email!,
          },
        });
      }
    },
  },
});
