import express, { Application } from "express";

//* Express App
const app: Application = express();

//* Global Middlewares
app.use(express());

//* GET /
app.get("/", (_req, res) => {
	//* 200 Success Response
	res.status(200).json({
		success: true,
		message: "Welcome to Bloggle Backend",
	});
});

export { app };
