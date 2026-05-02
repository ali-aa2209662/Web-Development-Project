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
            where: {authorId: id},
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

    // async getCommentsById(id){
    //     return await prisma.post.findUnique()
    // }

    async createComment(authorId, postId, content) {
        return await prisma.comment.create({ data: { authorId, postId, content } });
    }

    async deleteComment(id) {
        return await prisma.comment.delete({ where: { id } });
    }
}

//tester
console.log(await new PostRepo().createComment("cmoom0la20000urtke5w8z6gd", "cmoom41q00001ur2w1s0waj9v", "Hi"))
// console.log(process.env.DATABASE_URL);

export default new PostRepo();