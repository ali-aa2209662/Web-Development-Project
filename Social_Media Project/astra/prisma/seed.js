const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const NUM_USERS = 100;

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

async function main() {
    console.log("🌱 Seeding...");

    // Clear DB (order matters because of relations)
    await prisma.postLike.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const users = [];
    for (let i = 1; i <= NUM_USERS; i++) {
        const user = await prisma.user.create({
            data: {
                username: `user${i}`,
                email: `user${i}@test.com`,
                password: "123456",
                bio: `Hello I am user${i}`,
            }
        });
        users.push(user);
    }

    // Create posts
    const posts = [];
    for (const user of users) {
        const numPosts = randomInt(4); // 0–3

        for (let i = 0; i < numPosts; i++) {
            const post = await prisma.post.create({
                data: {
                    content: `Post by ${user.username}`,
                    authorId: user.id
                }
            });
            posts.push(post);
        }
    }

    // Create follows
    for (const user of users) {
        const numFollows = randomInt(10);

        for (let i = 0; i < numFollows; i++) {
            const target = users[randomInt(NUM_USERS)];

            if (target.id !== user.id) {
                try {
                    await prisma.follow.create({
                        data: {
                            followerId: user.id,
                            followingId: target.id
                        }
                    });
                } catch (e) {
                    // Ignore duplicates بسبب @@unique
                }
            }
        }
    }

    // Create post likes
    for (const post of posts) {
        const numLikes = randomInt(10);

        for (let i = 0; i < numLikes; i++) {
            const user = users[randomInt(NUM_USERS)];

            try {
                await prisma.postLike.create({
                    data: {
                        userId: user.id,
                        postId: post.id
                    }
                });
            } catch (e) {
                // Ignore duplicates
            }
        }
    }

    console.log("✅ Seeding finished!");
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });