import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepo {

    async getAll() {
        const users = await prisma.user.findMany({
            orderBy: { username: "asc" },
            include: {
                followers: { select: { followerId: true } },
                following: { select: { followingId: true } }
            }
        });
        return users.map(this.mapFollowIds);
    }

    async getAllButId(id) {
        const users = await prisma.user.findMany({
            orderBy: { username: "asc" },
            where: {
                id: { not: id },
            },
            include: {
                followers: { select: { followerId: true } },
                following: { select: { followingId: true } }
            }
        });
        return users.map(this.mapFollowIds);
    }

    async getById(id) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                posts: true,
                followers: { select: { followerId: true } },
                following: { select: { followingId: true } }
            }
        });
        return user ? this.mapFollowIds(user) : null;
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
        const users = await prisma.user.findMany({
            orderBy: { username: "asc" },
            where: {
                OR: [
                    { username: { contains: query } },
                    { password: { contains: query } },
                    { bio: { contains: query } }
                ]
            },
            include: {
                followers: { select: { followerId: true } },
                following: { select: { followingId: true } }
            }
        });
        return users.map(this.mapFollowIds);
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

    mapFollowIds(user) {
        return {
            ...user,
            followers: user.followers?.map(f => f.followerId) ?? [],
            following: user.following?.map(f => f.followingId) ?? []
        };
    }

}

//tester
(async () => {
    console.log(await new UserRepo().search('user1'));
})();

export default new UserRepo();