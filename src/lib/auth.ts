import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createTransport } from "nodemailer";
import { prisma } from "./prisma.ts";
import { admin } from "better-auth/plugins";
import { adminClient } from "better-auth/client/plugins";

//* Email Transporter
const emailTransporter = createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.APP_EMAIL,
		pass: process.env.APP_PASS,
	},
});

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
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url: verificationUrl, token: userToken }) => {
			// Email HTML Body
			const emailBody = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <title>Verify Your Email</title>

                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Arial, Helvetica, sans-serif;
                        }

                        .wrapper {
                            width: 95%;
                            padding: 2rem;
                            background-color: #ffffff;
                        }

                        .container {
                            max-width: 35rem;
                            margin: 0 auto;
                            background-color: #f4f6f8;
                            border-radius: 1rem;
                            padding: 2rem;
                        }

                        .heading {
                            font-size: 1.5rem;
                            font-weight: 600;
                            text-align: center;
                            color: #22283f;
                            margin-bottom: 0.5rem;
                        }

                        .paragraph {
                            font-size: 1rem;
                            text-align: center;
                            line-height: 1.6;
                            color: #374151;
                        }

                        .button-wrapper {
                            text-align: center;
                            margin: 1.5rem;
                        }

                        .button {
                            display: inline-block;
                            background-color: #35424f;
                            color: #f4f6f8 !important;
                            text-decoration: none;
                            font-size: 1rem;
                            font-weight: 600;
                            padding: 0.75rem 1.3rem;
                            border-radius: 0.5rem;
                        }

                        .footer-text {
                            font-size: 1rem;
                            text-align: center;
                            line-height: 1.6;
                            color: #5b6272;
                        }
                    </style>
                </head>
                <body>
                    <div class="wrapper">
                        <div class="container">

                        <div class="heading">
                            Verify Your Email Address
                        </div>

                        <div class="paragraph">
                            To complete your account setup, please confirm your email address. This step helps us to ensure your account is secure and maintain platform integrity.
                        </div>

                        <div class="button-wrapper">
                            <a href="${verificationUrl}" class="button">
                                Verify Email
                            </a>
                        </div>

                        <div class="footer-text">
                            This verification link will expire soon for security reasons. If you did not create this account, you can safely ignore this email.
                        </div>
                    </div>
                </body>
            </html>
            `;
			// Send Email
			await emailTransporter.sendMail({
				from: `"Bloggle" <mahnaf.swe@gmail.com>`,
				to: user.email,
				subject: "Verify Your Email",
				html: emailBody,
			});
		},
	},
	// OAuth Providers
	socialProviders: {
		google: {
			enabled: true,
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			accessType: "offline",
			prompt: "select_account consent",
			responseMode: "form_post",
			scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/blogger"],
		},
		github: {
			enabled: true,
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			responseMode: "form_post",
			scope: ["read:user", "user:email"],
		},
	},
	// Plugins
	plugins: [admin(), adminClient()],
});

export { auth };
