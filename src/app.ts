import express, { Application } from "express";
import { postsRouter } from "./modules/posts/posts.router.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";

//* Express App
const app: Application = express();

//* Auth Route Handler
app.all("/api/v1/auth/*splat", toNodeHandler(auth));

//* Global Middlewares
app.use(express.json());

//* Modules
app.use("/api/v1/posts", postsRouter);

//* GET /
app.get("/", (_req, res) => {
	//* 200 Success Response
	res.status(200).json({
		success: true,
		message: "Welcome to Bloggle Backend",
	});
});

export { app };
