import { infoLog } from "@/utils/log";

export async function getAllCookies(url: string) {
  const cookies = await chrome.cookies.getAll({ url });
  infoLog("chrome.cookies.getAll", url, cookies);
  return cookies;
}
