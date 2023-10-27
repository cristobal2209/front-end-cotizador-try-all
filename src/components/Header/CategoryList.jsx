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
    className="rounded-md p-2 text-gray-500 font-semibold hover:bg-transparent hover:shadow-lg "
  >
    <div className="flex items-center gap-3 rounded-lg">
      {/* icono categoria */}
      <div className={`rounded-lg bg-white p-5 shadow-md`}></div>
      {/* titulo categoria */}
      <div className="text-center">{category}</div>
    </div>
  </a>
));

export default function CategoryList() {
  return (
    <div className=" flex h-full w-full items-center justify-center">
      <div className="grid w-2/3 grid-cols-4 gap-2 px-5">
        {renderCategories}
      </div>
    </div>
  );
}
