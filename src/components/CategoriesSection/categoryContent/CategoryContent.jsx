import React from "react";

const CategoryContent = ({ image, title, description, onClick }) => {
  return (
    <div
      className="w-[150px] h-[150px] relative cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />

      <div className="absolute top-4 left-4 right-4 text-white">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </div>
  );
};

export default CategoryContent;
