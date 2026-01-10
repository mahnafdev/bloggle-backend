import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.ts";

//* Better-Auth Initialization
const auth = betterAuth({
	// App and Basic Settings
	appName: "Bloggle",
	basePath: "/api/v1/auth",
	// Database Settings
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	// Auth Settings
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
	},
});

export { auth };
