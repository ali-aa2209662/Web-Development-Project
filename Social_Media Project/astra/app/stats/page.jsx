import StatsRepo from "@/Repos/StatsRepo";
import StatsCard from "@/app/components/StatsCard";
import NavBar from "../components/NavBar";

export default async function StatsPage() {
  const avgFollowers       = await StatsRepo.getAvgFollowersPerUser();
  const mostFollowedUser   = await StatsRepo.getMostFollowedUser();
  const totalLikes         = await StatsRepo.getTotalLikes();
  const mostActiveUser     = await StatsRepo.getMostActiveUser();
  const mostLikedPost      = await StatsRepo.getMostLikedPost();
  const mostCommentedPost  = await StatsRepo.getMostCommentedPost();
  const mostActiveCommenter = await StatsRepo.getMostActiveCommenter();
  const mostActiveLiker    = await StatsRepo.getMostActiveLiker();

  return (
    <>
    <NavBar />
    <div style={{ padding: "2rem" }}>
      <h1>Site Statistics</h1>
      <div className="StatsGrid">

        <StatsCard
          title="Avg Followers Per User"
          value={avgFollowers}
          icon="👥"
        />

        <StatsCard
          title="Most Followed User"
          value={mostFollowedUser?.username}
          subtitle={`${mostFollowedUser?._count?.followers ?? 0} followers`}
          icon="⭐"
        />

        <StatsCard
          title="Total Likes"
          value={totalLikes}
          icon="👍"
        />

        <StatsCard
          title="Most Active User"
          value={mostActiveUser?.username}
          subtitle={`${mostActiveUser?._count?.posts ?? 0} posts`}
          icon="✍️"
        />
        

        <StatsCard
          title="Most Liked Post"
          value={mostLikedPost?.content?.slice(0, 60) + "..."}
          subtitle={`${mostLikedPost?._count?.likes ?? 0} likes`}
          icon = "❤️"
        />

        <StatsCard
          title="Most Commented Post"
          value={mostCommentedPost?.content?.slice(0, 60) + "..."}
          subtitle={`${mostCommentedPost?._count?.comments ?? 0} comments`}
          icon = "💬"
        />

        <StatsCard
          title="Most Active Commenter"
          value={mostActiveCommenter?.username}
          subtitle={`${mostActiveCommenter?._count?.comments ?? 0} comments`}
          icon="🔥"
        />

        <StatsCard
          title="Most Active Liker"
          value={mostActiveLiker?.username}
          subtitle={`${mostActiveLiker?._count?.postLikes ?? 0} post likes`}
          icon="🤝"
        />

      </div>
    </div>
  </>
  );
}
