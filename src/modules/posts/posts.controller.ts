import { Request, Response } from "express";
import { Post, PostStatus, PostVisibility } from "../../../generated/prisma/client.ts";
import { postsService } from "./posts.service.ts";

//* Create a Post
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
		// Receive query params
		const query = req.query;
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
		const queryParams = {
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
		};
		// Nuts and Bolts
		const result: { posts: Post[]; total: number } =
			await postsService.getPosts(queryParams);
		// Filter useless params
		const usedQueryParams = Object.fromEntries(
			Object.entries(queryParams).filter(([_, value]) => {
				if (!value) return false;
				if (Array.isArray(value) && value.length === 0) return false;
				return true;
			}),
		);
		// 200 success response
		return res.status(200).json({
			success: true,
			message: "Posts retrieved successfully",
			total: result.total,
			params: usedQueryParams,
			data: result.posts,
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

//* Get a Post
const getPost = async (req: Request, res: Response) => {
	try {
		// Receive params
		const id = req.params.id;
		// Nuts and Bolts
		const data: Post = await postsService.getPost(id);
		// 200 success response
		return res.status(200).json({
			success: true,
			message: "Post retrieved successfully",
			data,
		});
	} catch (err: any) {
		// 500 error response
		return res.status(500).json({
			success: false,
			message: "Unable to retrieve the post",
			error: {
				code: err.code || undefined,
				message: err.message || undefined,
				details: err,
			},
		});
	}
};

export const postsController = { createPost, getPosts, getPost };
