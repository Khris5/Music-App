import BottomBar from "../../components/bottomBar/BottomBar";
import MusicCard from "../../components/musicCard/MusicCard";
// import data from "../../assets/data/data";
import { useState, useContext, useEffect } from "react";
import Player from "../../components/player/Player";
import CategoriesSection from "../../components/CategoriesSection/mainSection/CategoriesSection";
import { ApiContext } from "../../ApiContext/Apicontext";
import RecentlyPlayedSection from "../../components/recentlyPlayed/RecentlyPlayedSection";

const Home = () => {
  const {
    userPlaylists,
    fetchUserPlaylists,
    initiateSpotifyLogin,
    accessToken,
    fetchRecentlyPlayed,
    fetchRecommendations,
  } = useContext(ApiContext);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        if (!accessToken && !window.location.hash.includes("access_token")) {
          initiateSpotifyLogin();
          return;
        }
        if (accessToken) {
          await Promise.all([
            fetchUserPlaylists(accessToken),
            fetchRecentlyPlayed(accessToken),
            // fetchRecommendations(accessToken),
          ]);
        }
      } catch (err) {
        setError(err.message);
        if (err.message.includes("401")) {
          localStorage.removeItem("spotify_access_token");
          initiateSpotifyLogin();
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [accessToken]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const playSong = (index) => {
    setCurrentSongIndex(index);
  };

  return (
    <div
      className="h-screen w-full relative px-5 font-didact"
      style={{
        background:
          "linear-gradient(0deg, rgba(0,0,0,1) 90%, rgba(4,54,60,1) 100%)",
      }}
    >
      <div className="flex justify-between items-center pt-5">
        <div className="flex items-center gap-2">
          <img
            src=""
            alt="logo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="text-gray-400 text-sm">Welcome back!</h3>
            <h1 className="text-white text-xl font-bold">John Doe</h1>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-white text-xl font-bold">Recently Played</h2>
        <RecentlyPlayedSection />
      </div>

      <CategoriesSection title="Recommended for you" />
      {/* <div className="flex flex-col gap-5 mt-5">
        <h1 className="text-white text-xl font-bold">Top Songs</h1>
        {data.map((song, index) => {
          const { id, songImg, songName, artistName } = song;
          return (
            <MusicCard
              key={id}
              songImg={songImg}
              songName={songName}
              artistName={artistName}
              playSong={() => playSong(index)}
            />
          );
        })}
      </div> */}
      {currentSongIndex !== null && (
        <div className="fixed bottom-16 left-0 right-0 z-10">
          <Player
            tracks={data}
            currentTrackIndex={currentSongIndex}
            setCurrentTrackIndex={setCurrentSongIndex}
          />
        </div>
      )}

      <BottomBar />
    </div>
  );
};

export default Home;
