import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StatsRepo {
    async getAvgFollowersPerUser() {
        const totalUsers = await prisma.user.count();
        const totalFollows = await prisma.follow.count();
        return totalUsers === 0 ? 0 : (totalFollows / totalUsers).toFixed(2);
    }

    async getMostFollowedUser() {
        return await prisma.user.findFirst({
            orderBy: { followers: { _count: "desc" } },
            select: {
                id: true,
                username: true,
                _count: { select: { followers: true } },
            },
        });
    }

    async getTotalLikes() {
        const postLikes = await prisma.postLike.count();
        const commentLikes = await prisma.commentLike.count();
        return postLikes + commentLikes;
    }

    async getMostActiveUser() {
        return await prisma.user.findFirst({
            orderBy: { posts: { _count: "desc" } },
            select: {
                id: true,
                username: true,
                _count: { select: { posts: true } },
            },
        });
    }
}

export default new StatsRepo();
