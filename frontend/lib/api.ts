import { client } from "./client/client.gen";
import { getAccessToken } from "./auth";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

client.setConfig({
  baseUrl,
  auth: getAccessToken,
});

export { client };