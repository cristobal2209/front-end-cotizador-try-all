import Typesense from "typesense";

export const client = new Typesense.Client({
  nodes: [
    {
      host: "162.212.155.221", // For Typesense Cloud use xxx.a1.typesense.net
      port: 8108, // For Typesense Cloud use 443
      protocol: "http", 
    },
  ],
  apiKey: "brandon",
  connectionTimeoutSeconds: 2,
});