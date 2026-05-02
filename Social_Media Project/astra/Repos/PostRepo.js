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
            where: {
                authorId: id,
                include: {
                    comments: true
                }
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

    async create(authorId, content) {
        return await prisma.post.create({ data: { content, authorId } });
    }

    async delete(id) {
        return await prisma.post.delete({ where: { id } });
    }

    // async getCommentsById(id){
    //     return await prisma.post.findUnique()
    // }

    async createComment(authorId, postId, content) {
        return prisma.comment.create({ data: { authorId, postId, content } })
    }
}

//tester
console.log(await new PostRepo().getById("cmoodkvj80001ur447kocwbux"))

export default new PostRepo();