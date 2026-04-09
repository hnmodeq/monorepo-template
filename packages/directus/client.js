import { createDirectus, rest, authentication } from "@directus/sdk";

const client = createDirectus(import.meta.env?.VITE_BASE_URL)
  .with(authentication("session", { credentials: "include", autoRefresh: true }))
  .with(rest({ credentials: "include" }));

export default client;
