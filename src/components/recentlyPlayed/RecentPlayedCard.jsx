import React from "react";

const RecentPlayedCard = ({ image, title, artist }) => {
  return (
    <div className="h-14 w-full flex items-center gap-2 bg-[#343b3c] rounded-lg">
      <img
        src={image}
        alt={title}
        className="w-14 h-14 object-cover rounded-lg"
      />
      <div className="flex flex-col overflow-hidden">
        <h3 className="text-white text-sm  font-poppins truncate">{title}</h3>
        <p className="text-gray-400 text-xs truncate font-didact">{artist}</p>
      </div>
    </div>
  );
};

export default RecentPlayedCard;
