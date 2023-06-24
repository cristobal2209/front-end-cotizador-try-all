import React, { useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function CategoryList() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] =
    React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const categories = [
    "Categoría1",
    "Categoría2",
    "Categoría3",
    "Categoría4",
    "Categoría5",
    "Categoría6",
    "Categoría7",
    "Categoría8",
    "Categoría8",
  ];

  const renderCategories = categories.map((category, index) => (
    <a
      href={`#${category}`}
      key={index}
      className="rounded-md p-2 text-white hover:bg-primaryHover hover:shadow-md "
    >
      <div className="flex items-center gap-3 rounded-lg">
        {/* icono categoria */}
        <div className={`rounded-lg bg-white p-5`}></div>
        {/* titulo categoria */}
        <div className="text-center">{category}</div>
      </div>
    </a>
  ));

  return (
    <div className="relative">
      <button
        className="flex items-center rounded-md bg-transparent px-4 mx-2 py-2 font-semibold text-white hover:bg-primaryHover hover:shadow-md"
        onClick={handleToggle}
      >
        Categorías
        <div className="pl-1">
          <ChevronDownIcon
            strokeWidth={2}
            className={`block h-3 w-3 transition-transform ${isOpen || isMobileCategoriesOpen ? "rotate-180" : ""
              }`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="fixed left-0 top-20 flex min-h-[220px] w-full items-center justify-center rounded-md bg-primary shadow-lg ">
          <div className="grid w-2/3 grid-cols-4 gap-2 px-5 duration-300 ease-in-out">
            {renderCategories}
          </div>
        </div>
      )}
    </div>
  );
}
