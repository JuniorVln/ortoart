import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import crypto from "crypto";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { loginSchema } from "@/lib/auth-validations";

function hashPassword(password: string): string {
  return crypto.scryptSync(password, "salt-ortoart-cms", 64).toString("hex");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = loginSchema.parse(credentials);
          const db = getDb();
          const user = db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)
            .get();

          if (!user) return null;

          const hashedPassword = hashPassword(password);
          if (user.passwordHash !== hashedPassword) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 horas
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET ?? "ortoart-cms-secret-dev-change-in-production",
});
