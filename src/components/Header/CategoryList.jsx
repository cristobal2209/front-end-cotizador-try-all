import { useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function CategoryList({ open }) {
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
    <div className="relative font-normal">
      Categorías
      {open && (
        <div className="fixed left-0 top-20 flex min-h-[220px] w-full items-center justify-center rounded-md bg-primary shadow-lg ">
          <div className="grid w-2/3 grid-cols-4 gap-2 px-5 duration-300 ease-in-out">
            {renderCategories}
          </div>
        </div>
      )}
    </div>
  );
}
