import { createContext, useState, useEffect } from "react";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
const CLIENT_ID = "ba02a3d235664a32807977c86d12a7fd";
const REDIRECT_URI = "http://localhost:5173/callback";
const SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
  "user-read-recently-played",
  "user-read-email",
  "user-read-private",
  "streaming",
].join(" ");

export const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  // const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Check if we have a token in URL (after redirect)
    const hash = window.location.hash;
    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (token) {
        setAccessToken(token);
        console.log("Access token from hash", accessToken);

        window.location.hash = "";
        localStorage.setItem("spotify_access_token", token);
      }
    }
    // Check if we have a stored token
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken) {
      setAccessToken(storedToken);
      console.log("Access token from local storage", accessToken);
    }
  }, []);

  const initiateSpotifyLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}&response_type=token`;
    window.location.href = authUrl;
  };

  async function getSpotifyAccessToken(clientId, clientSecret) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    console.log(data);
    return data.access_token;
  }
  async function getUserDetails(accessToken) {
    const response = await fetch(`${SPOTIFY_API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log("User Details:", data);
    return data;
  }
  async function fetchSpotifyData(accessToken) {
    try {
      const response = await fetch(`${SPOTIFY_API_BASE}/browse/new-releases`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("New Releases:", data.albums.items);
      return data;
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      throw error;
    }
  }

  async function fetchUserPlaylists(accessToken) {
    try {
      const response = await fetch(`${SPOTIFY_API_BASE}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User Playlists:", data.items);
      const formattedPlaylists = data.items.map((playlist) => ({
        id: playlist?.id,
        title: playlist?.name,
        image: playlist?.images[0]?.url,
      }));
      setUserPlaylists(formattedPlaylists);
      return formattedPlaylists;
    } catch (error) {
      console.error("Error fetching playlists:", error);
      throw error;
    }
  }

  const fetchRecentlyPlayed = async (token) => {
    try {
      const response = await fetch(
        `${SPOTIFY_API_BASE}/me/player/recently-played?limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Recently Played:", data.items);
      const formattedTracks = data.items.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        image: item.track.album.images[0]?.url,
        artist: item.track.artists[0]?.name,
        artistId: item.track.artists[0]?.id,
      }));

      setRecentlyPlayed(formattedTracks);
      return formattedTracks;
    } catch (error) {
      console.error("Error fetching recently played:", error);
      throw error;
    }
  };

  //// FETCH RECOMMENDATIONS URL HAS BEEN DEPRECATED////
  // const fetchRecommendations = async (token) => {
  //   try {
  //     // Predefined genre pairs for each mix
  //     const genrePairs = [
  //       ["pop", "dance"],
  //       ["hip-hop", "rap"],
  //       ["rock", "alternative"],
  //       ["indie", "electronic"],
  //       ["jazz", "blues"],
  //     ];

  //     // First, get seed tracks from recently played
  //     const recentTracks = await fetchRecentlyPlayed(token);
  //     const seedTrack = recentTracks[0]?.id; // Use first recent track as seed
  //     const seedArtists = recentTracks[0]?.artistId;

  //     // Create 5 different mixes with different genres
  //     const mixes = await Promise.all(
  //       genrePairs.map(async (genres, index) => {
  //         const response = await fetch(
  //           `${SPOTIFY_API_BASE}/recommendations?limit=20&seed_artists=${seedArtists}&seed_genres=${genres.join(
  //             ","
  //           )}&seed_tracks=${seedTrack}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }

  //         const data = await response.json();
  //         console.log("Recommendations:", data);
  //         return {
  //           id: `daily-mix-${index + 1}`,
  //           title: `Daily Mix ${index + 1}`,
  //           description: `Based on ${genres.join(" & ")}`,
  //           tracks: data.tracks.map((track) => ({
  //             id: track.id,
  //             title: track.name,
  //             artist: track.artists[0].name,
  //             image: track.album.images[0]?.url,
  //             preview_url: track.preview_url,
  //           })),
  //           image: data.tracks[0]?.album.images[0]?.url,
  //         };
  //       })
  //     );

  //     setRecommendations(mixes);
  //     return mixes;
  //   } catch (error) {
  //     console.error("Error fetching recommendations:", error);
  //     throw error;
  //   }
  // };
  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("spotify_access_token");
    setUserPlaylists([]);
  };

  return (
    <ApiContext.Provider
      value={{
        initiateSpotifyLogin,
        logout,
        fetchUserPlaylists,
        userPlaylists,
        accessToken,
        recentlyPlayed,
        fetchRecentlyPlayed,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
