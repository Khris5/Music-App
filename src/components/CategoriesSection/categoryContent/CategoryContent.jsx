import React from "react";

const CategoryContent = ({ image, title }) => {
  return (
    <div className="w-[150px] h-[150px] relative before:content-[''] before:w-full before:h-2 before:absolute before:bottom-0 before:left-0 before:right-0 before:bg-black/50 ">
      <img src={image} alt={title} />
      <h3 className="absolute top-5 right-2 text-white text-sm font-bold">
        {title}
      </h3>
    </div>
  );
};

export default CategoryContent;
