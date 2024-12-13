import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import CategoryContent from "../CategoryContent/CategoryContent";
import { ApiContext } from "../../../ApiContext/Apicontext";

const CategoriesSection = ({ title }) => {
  // const { recommendations, fetchRecommendations, accessToken } =
  //   useContext(ApiContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (accessToken) {
  //     fetchRecommendations(accessToken, ["classical", "country"]);
  //   }
  // }, [accessToken]);

  const handleMixClick = (mixId) => {
    navigate(`/mix/${mixId}`);
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-5 pb-4 overflow-x-scroll">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="flex gap-6 py-4">
        {/* {recommendations.map((mix) => (
          <CategoryContent
            key={mix.id}
            image={mix.image}
            title={mix.title}
            description={mix.description}
            onClick={() => handleMixClick(mix.id)}
          />
        ))} */}
      </div>
    </div>
  );
};

export default CategoriesSection;
