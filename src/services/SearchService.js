import { client } from "../services/typesense.js";

export const getProductsFromInput = async (productSearchParam) => {
  try {
    const searchParams = {
      q: productSearchParam,
      query_by: "description",
      infix: "always",
    };

    const result = await client
      .collections("products")
      .documents()
      .search(searchParams);

    const productos = result.hits.map((document) => document.document);

    return productos;
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    throw error;
  }
};
