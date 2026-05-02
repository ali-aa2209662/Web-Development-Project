import StatsRepo from "@/Repos/StatsRepo";

export default async function StatsPage() {
  const avgFollowers = await StatsRepo.getAvgFollowersPerUser();
  const mostFollowedUser = await StatsRepo.getMostFollowedUser();
  const totalLikes = await StatsRepo.getTotalLikes();
  const mostActiveUser = await StatsRepo.getMostActiveUser();
  const mostLikedPost = await StatsRepo.getMostLikedPost();


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
        <p>{totalLikes}</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Query 4: Most Active User (Most Posts)</h2>
        {mostActiveUser ? (
          <p>
            {mostActiveUser.username} &mdash; {mostActiveUser._count.posts} posts
          </p>
        ) : (
          <p>No users found.</p>
        )}
      </section>
    </div>
  );
}
