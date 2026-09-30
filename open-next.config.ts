import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Site tamamen statik üretilir; ISR/önbellek deposu gerekmez.
export default defineCloudflareConfig({});
