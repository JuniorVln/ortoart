import NextAuth from "next-auth";

// Edge-compatible auth config for middleware only
const { handlers: edgeHandlers, auth: edgeAuth } = NextAuth({
  providers: [],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET ?? "ortoart-cms-secret-dev-change-in-production",
});

export const handlers = edgeHandlers;
export const auth = edgeAuth;
