import RecentPlayedCard from "./RecentPlayedCard";
import image from "../../assets/images/logo.png";

const RecentlyPlayedSection = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-3">
      <RecentPlayedCard image={image} title={"Coffee & Jazz"} />
      <RecentPlayedCard image={image} title={"Coffee & Jazz"} />
    </div>
  );
};

export default RecentlyPlayedSection;
