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
      className="text-white hover:text-secondary hover:bg-quaternaryHover rounded-md p-2"
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
        className="flex items-center rounded-md bg-transparent px-4 py-2 font-semibold text-white"
        onClick={handleToggle}
      >
        Categorías
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`block h-3 w-3 transition-transform ${
            isOpen || isMobileCategoriesOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="fixed left-0 top-20 flex h-1/6 w-full items-center justify-center rounded-md bg-primary shadow-lg transition-opacity duration-300">
          <div className="grid grid-cols-4 gap-2 w-full px-5">{renderCategories}</div>
        </div>
      )}
    </div>
  );
}
