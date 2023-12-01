import { client } from "../services/typesense.js";

export const getProductsFromInput = async (
  productSearchParam,
  page = 1,
  pageSize = 20
) => {
  try {
    const searchParams = {
      q: productSearchParam,
      query_by: "description",
      infix: "always",
      page,
      per_page: pageSize,
    };

    const result = await client
      .collections("typesenseProducts")
      .documents()
      .search(searchParams);

    const productos = result.hits.map((document) => document.document);

    return {
      data: productos,
      totalPages: result.found / pageSize,
      currentPage: page,
    };
  } catch (error) {
    throw new error;
  }
};
export async function getSearchSuggestions(query) {
  try {
    const searchParams = {
      q: query,
      query_by: "description",
      per_page: 5, // Número de sugerencias que deseas obtener
    };
    const result = await client
      .collections("typesenseProducts")
      .documents()
      .search(searchParams);
    const suggestions = result.hits.map((document) => document.document);
    return suggestions;
  } catch (error) {
    return new error
  }
}

export const getProductsFromCategory = async (categorySearchParam, page = 1, pageSize = 20) => {
  try {
    const searchParams = {
      q: categorySearchParam,
      query_by: "productCategory",
      page,
      per_page: pageSize,
    };

    const result = await client
      .collections("typesenseProducts")
      .documents()
      .search(searchParams);

    const productos = result.hits.map((document) => document.document);

    return {
      data: productos,
      totalPages: result.found / pageSize,
      currentPage: page,
    };
  } catch (error) {
    throw new error;
  }
};

export const getProductsFromCategoryAndName = async (categorySearchParam, page = 1, pageSize = 20) => {
  try {
    const searchParams = {
      q: categorySearchParam,
      query_by: "productCategory",
      page,
      per_page: pageSize,
    };

    const result = await client
      .collections("typesenseProducts")
      .documents()
      .search(searchParams);

    const productos = result.hits.map((document) => document.document);
    return {
      data: productos,
      totalPages: result.found / pageSize,
      currentPage: page,
    };
  } catch (error) {
    throw new error;
  }
};

