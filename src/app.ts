import express, { Application } from "express";
import { postsRouter } from "./modules/posts/posts.router.ts";

//* Express App
const app: Application = express();

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
