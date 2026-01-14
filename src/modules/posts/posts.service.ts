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

//* Retrieve Posts
const getPosts = async (queries: { search: string; tags: string[] }) => {
	// Retrieve posts with/without filters
	const result = await prisma.post.findMany({
		where: {
			OR: [
				{
					title: {
						contains: queries.search,
						mode: "insensitive",
					},
				},
				{
					content: {
						contains: queries.search,
						mode: "insensitive",
					},
				},
				{
					tags: {
						has: queries.search,
					},
				},
			],
			tags: {
				hasEvery: queries.tags,
			},
		},
	});
	return result;
};

export const postsService = { createPost, getPosts };
