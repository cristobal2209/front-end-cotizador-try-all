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
    "Categoría 1",
    "Categoría 2",
    "Categoría 3",
    "Categoría 4",
    "Categoría 5",
    "Categoría 6",
    "Categoría 7",
    "Categoría 8",
    "Categoría 8",
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
        className="flex items-center rounded-md bg-transparent px-4 py-2 font-semibold text-white hover:bg-primaryHover"
        onClick={handleToggle}
      >
        Categorías
        <div className="pl-1">
          <ChevronDownIcon
            strokeWidth={2}
            className={`block h-3 w-3 transition-transform ${
              isOpen || isMobileCategoriesOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="fixed left-0 top-20 flex h-1/6 w-full items-center justify-center rounded-md bg-primary shadow-lg duration-300 ease-in-out">
          <div className="grid w-full grid-cols-4 gap-2 px-5">
            {renderCategories}
          </div>
        </div>
      )}
    </div>
  );
}