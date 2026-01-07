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

export const postsController = { createPost };
