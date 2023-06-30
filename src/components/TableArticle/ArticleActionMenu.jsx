import { useState, Fragment } from "react";

export default function ArticleActionMenu({
  articleData,
  handleArticleEditDialog,
  deleteArticle,
}) {
  const [isOpenActionMenu, setOpenActionMenu] = useState(false);

  const handleMouseEnter = () => {
    setOpenActionMenu(true);
  };

  const handleMouseLeave = () => {
    setOpenActionMenu(false);
  };

  return (
    <Fragment>
      <button
        className="z-8 absolute rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-secondary focus:outline-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ...
      </button>
      {isOpenActionMenu && (
        <div className="z-9 absolute rounded-md border border-gray-300 bg-white shadow-lg">
          <button
            className="relative px-4 py-2 text-sm text-gray-700 hover:rounded-l-md hover:bg-secondary hover:text-white "
            onClick={() => handleArticleEditDialog(articleData)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Editar
          </button>
          <button
            className="relative px-4 py-2 text-sm text-gray-700 hover:rounded-r-md hover:bg-red-700 hover:text-white"
            onClick={() => deleteArticle(articleData)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Eliminar
          </button>
        </div>
      )}
    </Fragment>
  );
}
