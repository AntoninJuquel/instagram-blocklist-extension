import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version, name, author, contributors, homepage, title, description } = packageJson;

const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${env.command === "serve" ? "[Dev] " : ""}${name}`,
  author: `${author.name} & ${contributors.map((c) => c.name).join(", ")}`,
  homepage_url: homepage,
  description,
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  icons: {
    "128": "icon.png",
  },
  permissions: ["cookies", "storage", "unlimitedStorage", "tabs", "activeTab"],
  host_permissions: ["*://*.instagram.com/*"],
  action: {
    default_title: title,
    default_popup: "src/Popup/popup.html",
  },
  background: {
    service_worker: "src/Background/background.ts",
    type: "module",
  },
  options_ui: {
    page: "src/Options/options.html",
    open_in_tab: true,
  },
}));
