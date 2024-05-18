import { toBlockList } from "./blockListFile";
import { BlockList } from "./types";

export const blockListAllowedHosts = [
  "raw.githubusercontent.com",
  "gist.githubusercontent.com",
  "blockout.lol",
];
export function validateBlockListURLs(url: string): Array<string> {
  return [...new Set(url.split("|"))]
    .map((url) => url.trim())
    .filter((url) => {
      try {
        const parsedUrl = new URL(url);
        if (
          parsedUrl.protocol !== "https:" ||
          !blockListAllowedHosts.includes(parsedUrl.host)
        ) {
          return false;
        }
      } catch (e) {
        return false;
      }

      return true;
    });
}
export async function fetchBlockListURLs(url: string): Promise<BlockList[]> {
  const blockListURLs = [...new Set(url.split("|"))];
  const blockListTexts = await Promise.all(
    blockListURLs.map((url) =>
      fetch(url.trim()).then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(`failed fetch -- ${res.status} ${res.statusText}`);
        }

        return res.text();
      })
    )
  );
  const blocklists: [string, string][] = blockListURLs.map(
    (blockListURL, index) => [blockListURL, blockListTexts[index]]
  );
  return toBlockList(...blocklists);
}
