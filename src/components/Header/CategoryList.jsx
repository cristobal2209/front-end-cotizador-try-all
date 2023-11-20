import { useEffect, useState } from "react";
import { getProductsFromCategory } from "../../services/SearchService";
import { useNavigate } from "react-router-dom";
export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    const [searchResults, setSearchResults] = useState([]);
    getProductsFromCategory(categoryName);
    navigate(`/search/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className=" flex h-full w-full items-center justify-center">
      <div className="grid w-3/4  grid-cols-4 gap-2 ">
        {newCategories.map((category, index) => {
          return (
            <a
              href={`/search/${category.categoryName}`}
              key={index}
              className="rounded-md text-light font-semibold hover:bg-transparent hover:shadow-lg"
              onClick={() => handleCategoryClick(category.categoryName)}
            >
              <div className="flex items-center gap-3 rounded-lg ">
                <div className="rounded-lg bg-white p-3 shadow-md">
                  <img src={category.image} alt={category.categoryName} />
                </div>
                {/* titulo categoria */}
                <div className="text-left">{category.categoryName}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
