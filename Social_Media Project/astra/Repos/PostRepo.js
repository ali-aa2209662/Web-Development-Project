import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostRepo {
    async getAll() {
        return await prisma.post.findMany({
            orderBy: { date: 'desc' },
            include: {
                comments: {
                    orderBy: { date: 'desc' }
                }
            }
        });
    }

    async getByAuthorId(id) {
        return await prisma.post.findMany({
            where: { authorId: id },
            orderBy: { date: 'desc' },
            include: {
                comments: {
                    orderBy: { date: 'desc' }
                }
            }

        });
    }

    async getById(id) {
        return await prisma.post.findUnique({
            where: { id },
            include: {
                comments: {
                    orderBy: { date: 'desc' }
                }
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
(async () => {
    console.log(await new PostRepo().toggleCommentLike("cmop3qkfr0000ur9o1vr7xn27", 'cmop42cls0001urccam68gf8h'));
})();

export default new PostRepo();