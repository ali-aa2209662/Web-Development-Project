import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostRepo {
    async getAll() {
        return await prisma.post.findMany({
            include: {
                comments: true
            }
        });
    }

    async getByAuthorId(id) {
        return await prisma.post.findMany({
            where: { authorId: id },
            include: {
                comments: true
            }

        });
    }

    async getById(id) {
        return await prisma.post.findUnique({
            where: { id },
            include: {
                comments: true
            }
        });
    }

    async createPost(authorId, content) {
        return await prisma.post.create({ data: { content, authorId } });
    }

    async deletePost(id) {
        return await prisma.post.delete({ where: { id } });
    }

    async togglePostLike(userId, postId) {

        const existing = await prisma.postLike.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        if (existing) {
            await prisma.postLike.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId
                    }
                }
            });

            return false;
        }

        await prisma.postLike.create({
            data: {
                userId,
                postId
            }
        });

        return true;
    }
    // async getCommentsById(id){
    //     return await prisma.post.findUnique()
    // }

    async createComment(authorId, postId, content) {
        return await prisma.comment.create({ data: { authorId, postId, content } });
    }

    async deleteComment(id) {
        return await prisma.comment.delete({ where: { id } });
    }

    async toggleCommentLike(userId, commentId) {

        const existing = await prisma.commentLike.findUnique({
            where: {
                userId_commentId: {
                    userId,
                    commentId
                }
            }
        });

        if (existing) {
            await prisma.commentLike.delete({
                where: {
                    userId_commentId: {
                        userId,
                        commentId
                    }
                }
            });

            return false;
        }

        await prisma.commentLike.create({
            data: {
                userId,
                commentId
            }
        });

        return true;
    }
}

//tester
console.log(await new PostRepo().createComment("cmoom0la20000urtke5w8z6gd", "cmoom41q00001ur2w1s0waj9v", "Hi"))
// console.log(process.env.DATABASE_URL);

export default new PostRepo();