import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepo {
    async getAll() {
        return await prisma.user.findMany({ orderBy: { id: "asc" } })
    }

    async getById(id) {
        return await prisma.user.findUnique({
            id: Number(id)
        })
    }

    async create(data) {
        const newUser = {
            username: data.username,
            email: data.email,
            password: data.password,
            bio: data.bio,
        };
        return await prisma.user.create({ data: newItem });
    }

    async update(id, data) {
        return await prisma.user.update({ data: data, where: { id: Number(id) } })
    }

}

console.log(await new UserRepo().getAll())

export default new UserRepo();