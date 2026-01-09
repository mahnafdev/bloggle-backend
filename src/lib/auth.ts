import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.ts";

//* Better-Auth Initialization
const auth = betterAuth({
	appName: "Bloggle",
	basePath: "/api/v1/auth",
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
});

export { auth };
