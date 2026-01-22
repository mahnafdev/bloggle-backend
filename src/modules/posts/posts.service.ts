import { Post, PostStatus, PostVisibility } from "../../../generated/prisma/client.ts";
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
	authorId: string | undefined;
	search: string | undefined;
	status: PostStatus | undefined;
	visibility: PostVisibility | undefined;
	tags: string[] | [];
	isFeatured: boolean | undefined;
	sortBy: string | undefined;
	orderBy: "asc" | "desc" | undefined;
	page: number | undefined;
	limit: number | undefined;
}): Promise<{ posts: Post[]; total: number }> => {
	// Retrieve posts with/without filters
	// Initialize querying objects
	const conditions: object[] = [];
	const presentation: {
		sortBy?: string;
		orderBy?: "asc" | "desc";
		skip?: number;
		take?: number;
	} = {};
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
			visibility: q.visibility,
		});
	}
	// Filter by isFeatured
	if (q.isFeatured) {
		conditions.push({
			isFeatured: q.isFeatured,
		});
	}
	// Sort
	if (q.sortBy && q.orderBy) {
		presentation.sortBy = q.sortBy;
		presentation.orderBy = q.orderBy;
	}
	// Offset pagination
	if (q.limit && q.page) {
		presentation.skip = q.limit * (q.page - 1);
		presentation.take = q.limit;
	}
	// Fetch data with filters
	const result = await prisma.post.findMany({
		where: {
			AND: conditions,
		},
		skip: presentation.skip,
		take: presentation.take,
		orderBy: {
			[presentation.sortBy as string]: presentation.orderBy,
		},
	});
	// Count of total data
	const total = await prisma.post.count({
		where: {
			AND: conditions,
		},
	});
	// Return result
	return {
		posts: result,
		total,
	};
};

export const postsService = { createPost, getPosts };
