import { infoLog } from "@/utils/log";

export async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  infoLog("chrome.tabs.query", tab);
  return tab;
}
