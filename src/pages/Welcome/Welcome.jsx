import React from "react";
import heroImg from "../../assets/images/img_girl.png";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import Bubble from "../../components/bubble/Bubble";

const Welcome = () => {
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

  const navigate = useNavigate();
  return (
    <div className="flex flex-col-reverse items-center h-screen w-full min-w-[320px] mx-auto relative bg-[#3ec0d4]">
      <Bubble top="10" left="2" w="3" h="3" />
      {/* <Bubble top="2.5" left="1" w="2.5" h="2.5" /> */}

      <Bubble top="15" left="14" w="4" h="4" />

      <Bubble top="2" left="13" w="5" h="5" />
      <img
        src={heroImg}
        alt="hero"
        className="w-full h-[] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="flex flex-col items-center justify-end gap-4  bg-black py-14 px-8 rounded-t-[40px] z-10">
        <h2 className="text-white text-base font-bold font-didact tracking-wider text-center">
          From the <span className="text-[#06A0B5]">latest</span> to the
          greatest hits, play your favorite tracks on{" "}
          <span
            className="text-[#06A0B5]"
            style={{ textShadow: "0px 0px 10px #ffffff5e" }}
          >
            musium
          </span>{" "}
          now!
        </h2>
        <button
          className="bg-[#06A0B5] font-mulish text-white px-6 py-3 rounded-full w-full text-sm font-bold shadow-[0px_0px_15px_#ffffff5e]"
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
