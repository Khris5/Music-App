import logo from "../../assets/images/logo.png";

const Launch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black w-full min-w-[320px] mx-auto">
      <img src={logo} alt="logo" className="w-56 h-56 object-cover" />
      <h1
        className="text-[#06A0B5] text-4xl font-bold"
        style={{ textShadow: "0px 0px 10px #ffffff5e" }}
      >
        musium
      </h1>
    </div>
  );
};

export default Launch;
