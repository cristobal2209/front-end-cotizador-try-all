import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";

export default function CategoryList() {
  const [newCategories, setNewCategories] = useState([]);

  async function getCategories() {
    const querySnapshot = await getDocs(collection(db, "categories"));
    let Categories = [];
    querySnapshot.forEach((doc) => {
      Categories.push({ ...doc.data() });
    });
    setNewCategories(Categories);
  }
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    console.log(newCategories);
  }, [newCategories]);

  return (
    <div className=" flex h-full w-full items-center justify-center">
      <div className="grid w-3/4  grid-cols-4 gap-2 ">
        {newCategories.map((category, index) => {
          return (
            <a
              href={`${category.href}`}
              key={index}
              className="rounded-md text-light font-semibold hover:bg-transparent hover:shadow-lg "
            >
              <div className="flex items-center gap-3 rounded-lg">
                {/* icono categoria */}
                <div className={`rounded-lg bg-white p-3 shadow-md`}>
                  <img src={category.image} alt="" />
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
