/*
  Warnings:

  - You are about to drop the column `created_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `is_featured` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `read_time` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `review_requested_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `is_verified` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `x_twitter` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `reacted_at` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Reaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readTime` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_post_id_fkey";

-- DropIndex
DROP INDEX "Comment_parent_id_idx";

-- DropIndex
DROP INDEX "Comment_post_id_idx";

-- DropIndex
DROP INDEX "Comment_user_id_idx";

-- DropIndex
DROP INDEX "Post_author_id_idx";

-- DropIndex
DROP INDEX "Profile_user_id_idx";

-- DropIndex
DROP INDEX "Profile_user_id_key";

-- DropIndex
DROP INDEX "Reaction_post_id_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "created_at",
DROP COLUMN "parent_id",
DROP COLUMN "post_id",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parentId" UUID,
ADD COLUMN     "postId" UUID NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "author_id",
DROP COLUMN "is_featured",
DROP COLUMN "read_time",
DROP COLUMN "review_requested_at",
DROP COLUMN "reviewed_at",
DROP COLUMN "updated_at",
ADD COLUMN     "authorId" UUID NOT NULL,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "readTime" VARCHAR(7) NOT NULL,
ADD COLUMN     "reviewRequestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "display_name",
DROP COLUMN "is_verified",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
DROP COLUMN "x_twitter",
ADD COLUMN     "displayName" VARCHAR(50) NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL,
ADD COLUMN     "xTwitter" TEXT;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "comment_id",
DROP COLUMN "post_id",
DROP COLUMN "reacted_at",
DROP COLUMN "user_id",
ADD COLUMN     "commentId" UUID,
ADD COLUMN     "postId" UUID,
ADD COLUMN     "reactedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
