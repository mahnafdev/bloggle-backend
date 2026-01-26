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

//* Retrieve Comments
const getComments = async (q: {
	userId: string | undefined;
	postId: string | undefined;
}): Promise<{ comments: Comment[]; total: number }> => {
	// Retrieve comments with/without filters
	// Initialize querying objects
	const conditions: object[] = [];
	// Filter by userId
	if (q.userId) {
		conditions.push({
			userId: q.userId,
		});
	}
	// Filter by postId
	if (q.postId) {
		conditions.push({
			postId: q.postId,
		});
	}
	// Fetch data with filters
	const result = await prisma.comment.findMany({
		where: {
			AND: conditions,
		},
	});
	// Count of total data
	const total = await prisma.comment.count({
		where: {
			AND: conditions,
		},
	});
	// Return result
	return {
		comments: result,
		total,
	};
};

export const commentsService = { createComment, getComments };
