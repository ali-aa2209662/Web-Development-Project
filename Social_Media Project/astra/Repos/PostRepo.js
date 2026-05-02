import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostRepo {
    async getAll() {
        return await prisma.post.findMany()
    }
}

//tester
console.log(await new PostRepo().getAll())

export default new PostRepo();