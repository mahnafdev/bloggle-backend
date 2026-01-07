import { Post } from "../../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";

const createPost = async (
	data: Omit<
		Post,
		| "id"
		| "views"
		| "isFeatured"
		| "status"
		| "reviewRequestedAt"
		| "reviewedAt"
		| "updatedAt"
	>,
) => {
	const result = await prisma.post.create({
		data,
	});
	return result;
};

export const postsService = { createPost };
