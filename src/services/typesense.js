import Typesense from "typesense";

export const client = new Typesense.Client({
  nodes: [
    {
      host: "162.212.155.221",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "brandon",
  connectionTimeoutSeconds: 2,
});
