import { Request, Response } from "express";
import { Comment } from "../../../generated/prisma/client.ts";
import { commentsService } from "./comments.service.ts";

//* Create A Comment
const createComment = async (req: Request, res: Response) => {
	try {
		// Nuts and Bolts
		const comment: Comment = await commentsService.createComment(req.body);
		// 201 success response
		res.status(201).json({
			success: true,
			message: "Comment created successfully",
			data: comment,
		});
	} catch (err: any) {
		// 500 error response
		res.status(500).json({
			success: false,
			message: "Unable to create comment",
			error: {
				code: err.code || undefined,
				message: err.message || undefined,
				details: err,
			},
		});
	}
};

//* Get Comments
const getComments = async (req: Request, res: Response) => {
	try {
		// Receive query params
		const query = req.query;
		const userId = query.userId as string | undefined;
		const postId = query.postId as string | undefined;
		const orderBy = query.orderBy as "asc" | "desc" | undefined;
		const page = Number(query.page) as number | undefined;
		const limit = Number(query.limit) as number | undefined;
		const queryParams = {
			userId,
			postId,
			orderBy,
			page,
			limit,
		};
		// Nuts and Bolts
		const result: { comments: Comment[]; total: number } =
			await commentsService.getComments(queryParams);
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
			message: "Comments retrieved successfully",
			total: result.total,
			params: usedQueryParams,
			data: result.comments,
		});
	} catch (err: any) {
		// 500 error response
		return res.status(500).json({
			success: false,
			message: "Unable to retrieve comments",
			error: {
				code: err.code || undefined,
				message: err.message || undefined,
				details: err,
			},
		});
	}
};

export const commentsController = { createComment, getComments };
