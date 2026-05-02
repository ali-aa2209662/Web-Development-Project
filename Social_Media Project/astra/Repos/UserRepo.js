import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepo {

    async getAll() {
        return await prisma.user.findMany({ orderBy: { username: "asc" } })
    }

    async getAllButId(id) {
        return await prisma.user.findMany({
            orderBy: { username: "asc" },
            where: {
                id: { not: id },
            }
        });
    }

    async getById(id) {
        return await prisma.user.findUnique({
            where: { id },
            include: {
                posts: true
            }
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
                    // { id: { not: query } },
                    { username: { contains: query } },
                    { password: { contains: query } },
                    { bio: { contains: query } }
                ]
            }
        });
    }

    async authEmail(email) { //returns true if email already exist and false otherwise
        return (await prisma.user.findUnique(
            { where: { email } }
        ) !== null)
    }

    async toggleFollow(followerId, followingId) {

        const existing = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });

        if (existing) {
            await prisma.follow.delete({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId
                    }
                }
            });

            return false;
        }

        await prisma.follow.create({
            data: {
                followerId,
                followingId
            }
        });

        return true;
    }

}

//tester
console.log(await new UserRepo().delete("cmoom0la20000urtke5w8z6gd"))

export default new UserRepo();