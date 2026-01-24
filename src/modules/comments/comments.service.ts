import { Comment } from "../../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";

//* Insert a Comment
const createComment = async (data: Omit<Comment, "id" | "createdAt" | "updatedAt">) => {
	// Check post's existence
	await prisma.post.findUniqueOrThrow({
		where: {
			id: data.postId,
		},
	});
	// Check parent comment's existence
	if (data.parentId) {
		await prisma.comment.findUniqueOrThrow({
			where: {
				id: data.parentId,
			},
		});
	}
	// Insert comment/reply
	const result = await prisma.comment.create({
		data,
	});
	// Return result
	return result;
};

export const commentsService = { createComment };
