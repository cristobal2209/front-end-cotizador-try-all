import { client } from "../services/typesense.js";

export const getProductsFromInput = async (productSearchParam, page = 1, pageSize = 20) => {
  try {
    const searchParams = {
      q: productSearchParam,
      query_by: 'description',
      infix: 'always',
      page,
      per_page: pageSize,
    };
    console.log(await client.collections('typesenseProducts').retrieve())
    console.log('Search URL:', client.collections("typesenseProducts").documents().search(searchParams)._url);
    const result = await client.collections("typesenseProducts").documents().search(searchParams);

    const productos = result.hits.map((document) => document.document);

    return {
      data: productos,
      totalPages: result.found / pageSize,
      currentPage: page,
    };
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    throw error;
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
    console.error("Error fetching search suggestions:", error);
    return [];
  }
}

export const getProductsFromCategory = async (productSearchParam) => {
  try {
    const searchParams = {
      q: productSearchParam,
      query_by: "productCategory",
    };

    const result = await client
      .collections("typesenseProducts")
      .documents()
      .search(searchParams);

    const productos = result.hits.map((document) => document.document);

    return productos;
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    throw error;
  }
};
