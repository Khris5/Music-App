import React from "react";

const RecentPlayedCard = ({ image, title }) => {
  return (
    <div className=" h-14 w-full  flex items-center gap-4 bg-[#343b3c] rounded-lg">
      <img
        src={image}
        alt={title}
        className="w-14 h-14 object-cover rounded-lg"
      />
      <h3 className="text-white text-sm font-bold">{title}</h3>
    </div>
  );
};

export default RecentPlayedCard;
