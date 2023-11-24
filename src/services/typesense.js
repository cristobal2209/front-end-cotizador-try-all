import Typesense from "typesense";

export const client = new Typesense.Client({
  nodes: [
    {
      host: "quotemaster.homedns.org",
      port: 443,
      protocol: "https",
      // path: "/typesense",
    },
  ],
  apiKey: "brandon",
  connectionTimeoutSeconds: 2,
});