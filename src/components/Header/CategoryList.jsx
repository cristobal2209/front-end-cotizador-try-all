import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCategoryClick = async (categoryName) => {
    navigate(`/search/category/${categoryName}`);
    window.location.reload();
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => doc.data());
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="grid w-3/4 grid-cols-4 gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className="rounded-md text-light font-semibold hover:bg-transparent hover:shadow-lg"
              onClick={() => handleCategoryClick(category.categoryName)}
            >
              <div className="flex items-center gap-3 rounded-lg">
                <div className="rounded-lg bg-white p-3 shadow-md">
                  <img src={category.image} alt={category.categoryName} />
                </div>
                <div className="text-left">{category.categoryName}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
