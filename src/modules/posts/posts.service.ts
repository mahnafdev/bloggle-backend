import { Post, PostVisibility } from "../../../generated/prisma/client.ts";
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
const getPosts = async (q: {
	id: string;
	authorId: string;
	search: string;
	status: string;
	visibility: string;
	tags: string[];
	isFeatured: boolean | undefined;
}): Promise<Post[] | Post> => {
	// Retrieve posts with/without filters
	if (q.id) {
		// Filter by ID
		const result = (await prisma.post.findUnique({
			where: {
				id: q.id,
			},
		})) as Post | [];
		// Return result
		return result;
	} else {
		// Initialize conditions
		const conditions: object[] = [];
		// Filter by authorId
		if (q.authorId) {
			conditions.push({
				authorId: q.authorId,
			});
		}
		// Filter by title, content, tags
		if (q.search) {
			conditions.push({
				OR: [
					{
						title: {
							contains: q.search,
							mode: "insensitive",
						},
					},
					{
						content: {
							contains: q.search,
							mode: "insensitive",
						},
					},
					{
						tags: {
							has: q.search,
						},
					},
				],
			});
		}
		// Filter by status
		if (q.status) {
			conditions.push({
				status: q.status,
			});
		}
		// Filter by tags
		if (q.tags) {
			conditions.push({
				tags: {
					hasEvery: q.tags,
				},
			});
		}
		// Filter by visibility
		if (q.visibility) {
			conditions.push({
				visibility: q.visibility as PostVisibility,
			});
		}
		// Filter by isFeatured
		if (q.isFeatured) {
			conditions.push({
				isFeatured: q.isFeatured,
			});
		}
		// Fetch data with filters
		const result = await prisma.post.findMany({
			where: {
				AND: conditions,
			},
		});
		// Return result
		return result;
	}
};

export const postsService = { createPost, getPosts };
