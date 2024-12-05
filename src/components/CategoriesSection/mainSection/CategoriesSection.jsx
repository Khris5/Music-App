import CategoryContent from "../CategoryContent/CategoryContent";

const CategoriesSection = ({ title, categories }) => {
  return (
    <div className="w-full flex flex-col gap-4 py-4 overflow-x-scroll">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="flex gap-6">
        {categories.map((category) => (
          <CategoryContent key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
