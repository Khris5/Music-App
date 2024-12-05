import React from "react";

const MusicCard = ({ songImg, songName, artistName, playSong }) => {
  return (
    <div
      className="w-full flex items-center gap-3 px-6 py-2 bg-[#1E1E1E] rounded-md"
      onClick={playSong}
    >
      <img
        src={songImg}
        alt=""
        className=" h-12 w-12 rounded-md object-cover"
      />
      <div className="flex flex-col ">
        <h1 className="text-white font-bold">{songName}</h1>
        <h3 className="text-gray-400 text-sm">{artistName}</h3>
      </div>
    </div>
  );
};

export default MusicCard;
