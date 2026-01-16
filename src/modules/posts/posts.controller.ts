import { Request, Response } from "express";
import { Post } from "../../../generated/prisma/client.ts";
import { postsService } from "./posts.service.ts";

//* Create A Post
const createPost = async (req: Request, res: Response) => {
	try {
		// Nuts and Bolts
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

//* Get Posts
const getPosts = async (req: Request, res: Response) => {
	try {
		// Query Params
		const query = req.query;
		const search = query.search ? query.search.toString() : "";
		const tags = query.tags ? query.tags.toString().split(",") : [];
		// Nuts and Bolts
		const posts: Post[] = await postsService.getPosts({ search, tags });
		// 200 success response
		return res.status(200).json({
			success: true,
			message: "Posts retrieved successfully",
			data: posts,
		});
	} catch (err: any) {
		// 500 error response
		return res.status(500).json({
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
