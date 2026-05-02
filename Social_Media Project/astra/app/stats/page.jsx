import { prisma } from "@/lib/prisma";

export default async function StatsPage() {
  // Query 1: Average followers per user
  const totalUsers = await prisma.user.count();
  const totalFollows = await prisma.follow.count();
  const avgFollowers = totalUsers === 0 ? 0 : (totalFollows / totalUsers).toFixed(2);

  // Query 3: Total likes across all posts and comments
  // Uncomment once Post and Comment models with a `likes` field are added to the schema
  // const postLikes = await prisma.post.aggregate({ _sum: { likes: true } });
  // const commentLikes = await prisma.comment.aggregate({ _sum: { likes: true } });
  // const totalLikes = (postLikes._sum.likes ?? 0) + (commentLikes._sum.likes ?? 0);

  // Query 4: Most active user (most posts)
  // Uncomment once a Post model is added to the schema
  // const mostActiveUser = await prisma.user.findFirst({
  //   orderBy: { posts: { _count: "desc" } },
  //   select: { id: true, username: true, _count: { select: { posts: true } } },
  // });

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Site Statistics</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Query 1: Average Followers Per User</h2>
        <p>{avgFollowers}</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Query 2: Most Followed User</h2>
        {mostFollowedUser ? (
          <p>
            {mostFollowedUser.username} &mdash; {mostFollowedUser._count.followers} followers
          </p>
        ) : (
          <p>No users found.</p>
        )}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Query 3: Total Likes (Posts + Comments)</h2>
        <p>Requires Post and Comment models in the schema.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Query 4: Most Active User (Most Posts)</h2>
        <p>Requires a Post model in the schema.</p>
      </section>
    </div>
  );
}
