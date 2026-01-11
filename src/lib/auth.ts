import { betterAuth, env } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.ts";

//* Better-Auth Initialization
const auth = betterAuth({
	// App and Basic Settings
	appName: "Bloggle",
	basePath: "/api/v1/auth",
	trustedOrigins: [process.env.APP_URL!],
	// Database Settings
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	// Auth Settings
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		minPasswordLength: 6,
		requireEmailVerification: true,
	},
});

export { auth };
