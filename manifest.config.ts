import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  author: "Antonin Juquel",
  description: "Blocklist for Instagram",
  icons: {
    "128": "icon.png",
  },
  action: {
    default_icon: {
      "128": "icon.png",
    },
    default_title: "Instagram Blocklist",
    default_popup: "index.html",
  },
  permissions: ["cookies", "storage", "unlimitedStorage", "tabs", "activeTab"],
  host_permissions: ["<all_urls>"],
  name:
    env.mode === "staging"
      ? `[INTERNAL] Instagram Blocklist`
      : `Instagram Blocklist`,
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
}));
