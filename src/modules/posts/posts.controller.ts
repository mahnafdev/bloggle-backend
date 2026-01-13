import { Request, Response } from "express";
import { Post } from "../../../generated/prisma/client.ts";
import { postsService } from "./posts.service.ts";

//* Create A Post
const createPost = async (req: Request, res: Response) => {
	try {
		// Nuts and bolts
		const post: Post = await postsService.createPost(req.body);
		// 201 success response
		res.status(201).json({
			success: true,
			message: "Post created successfully",
			data: post,
		});
	} catch (err: any) {
		// 500 error response
		res.status(500).json({
			success: false,
			message: "Unable to create post",
			error: {
				code: err.code || undefined,
				message: err.message || undefined,
				details: err,
			},
		});
	}
};

//* Get All Posts
const getPosts = async (req: Request, res: Response) => {
	try {
		// Nuts and bolts
		const posts: Post[] = await postsService.getPosts();
		// 200 success response
		res.status(200).json({
			success: true,
			message: "Posts retrieved successfully",
			data: posts,
		});
	} catch (err: any) {
		// 500 error response
		res.status(500).json({
			success: false,
			message: "Unable to retrieve posts",
			error: {
				code: err.code || undefined,
				message: err.message || undefined,
				details: err,
			},
		});
	}
};

export const postsController = { createPost, getPosts };
