import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepo {

    async getAll() {
        return await prisma.user.findMany({ orderBy: { username: "asc" } })
    }

    async getById(id) {
        return await prisma.user.findUnique({
            where: { id }
        })
    }

    async create(data) {
        const newUser = {
            username: data.username,
            email: data.email,
            password: data.password
        };
        return await prisma.user.create({ data: newUser });
    }

    async update(id, data) {
        const updUser = {
            username: data.username,
            email: data.email,
            password: data.password,
            profilePicture: data.profilePicture,
            bio: data.bio
        };
        return await prisma.user.update({ data: updUser, where: { id } })
    }

    async delete(id) {
        return await prisma.user.delete({ where: { id } })
    }

    async search(query) {
        return await prisma.user.findMany({
            orderBy: { username: "asc" },
            where: {
                OR: [
                    { id: { not: query } },
                    { username: { contains: query } },
                    { password: { contains: query } },
                    { email: { contains: query } },
                    { bio: { contains: query } }
                ]
            }
        });
    }



}

//tester
console.log(await new UserRepo().search(""))

export default new UserRepo();