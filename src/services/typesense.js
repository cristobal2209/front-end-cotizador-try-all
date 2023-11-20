import Typesense from "typesense";

export const client = new Typesense.Client({
  nodes: [
    {
      host: "quotemaster.homedns.org", // For Typesense Cloud use xxx.a1.typesense.net
      port: 8108, // For Typesense Cloud use 443
      protocol: "https", 
    },
  ],
  apiKey: "brandon",
  connectionTimeoutSeconds: 2,
});
