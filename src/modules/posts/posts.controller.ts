import { Request, Response } from "express";
import { Post, PostStatus, PostVisibility } from "../../../generated/prisma/client.ts";
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
		const id = query.id as string | undefined;
		const authorId = query.authorId as string | undefined;
		const search = query.search as string | undefined;
		const status = query.status as PostStatus | undefined;
		const visibility = query.visibility as PostVisibility | undefined;
		const tags = query.tags ? (query.tags as string).split(",") : [];
		const isFeatured = query.isFeatured
			? query.isFeatured === "true"
				? true
				: query.isFeatured === "false"
					? false
					: undefined
			: undefined;
		const sortBy = query.sortBy as string | undefined;
		const orderBy = query.orderBy as "asc" | "desc" | undefined;
		const page = Number(query.page) as number | undefined;
		const limit = Number(query.limit) as number | undefined;
		// Nuts and Bolts
		const posts: Post[] | Post | null = await postsService.getPosts({
			id,
			authorId,
			search,
			status,
			visibility,
			tags,
			isFeatured,
			sortBy,
			orderBy,
			page,
			limit,
		})!;
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
