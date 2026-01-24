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

export const commentsController = { createComment };
