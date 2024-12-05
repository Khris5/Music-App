import { useContext, useEffect } from "react";
import RecentPlayedCard from "./RecentPlayedCard";
import { ApiContext } from "../../ApiContext/Apicontext";

const RecentlyPlayedSection = () => {
  const { recentlyPlayed, fetchRecentlyPlayed, accessToken } =
    useContext(ApiContext);

  useEffect(() => {
    if (accessToken) {
      fetchRecentlyPlayed(accessToken);
    }
  }, [accessToken]);

  if (!recentlyPlayed.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-3">
      {recentlyPlayed.map((track) => (
        <RecentPlayedCard
          key={track.id}
          image={track.image}
          title={track.title}
          artist={track.artist}
        />
      ))}
    </div>
  );
};

export default RecentlyPlayedSection;
