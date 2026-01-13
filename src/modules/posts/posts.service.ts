import { Post } from "../../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";

//* Insert a Post
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

//* Retrieve All Posts
const getPosts = async () => {
	const result = await prisma.post.findMany();
	return result;
};

export const postsService = { createPost, getPosts };
