import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "kimi-preview",
    web_accessible_resources: [
      {
        matches: ["https://kimi.moonshot.cn/*"],
        resources: ["/ui.js"],
      },
    ],
  },
});
