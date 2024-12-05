import React from "react";

const Bubble = ({ top, left, w, h }) => {
  return (
    <div
      style={{
        top: `${top}rem`,
        left: `${left}rem`,
        width: `${w}rem`,
        height: `${h}rem`,
      }}
      className={` absolute rounded-full shadow-sm z-10 bg-[radial-gradient(circle_at_30%_30%,#3ec0d4,#00000044)]`}
    ></div>
  );
};

export default Bubble;
