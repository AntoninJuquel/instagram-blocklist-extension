import { BlockList, BlockListInfo, BlockListUser } from "./types";
import {
  descriptionLabel,
  idLabel,
  instagramblocklistLabel,
  nameLabel,
  titleLabel,
} from "./blockList";
import { getCurrentTab } from "@/services/chrome/tabs";

export function blockListMerge(blockLists: BlockList[], infos?: BlockListInfo) {
  const seen = new Set();

  const users = blockLists.reduce<BlockListUser[]>((acc, blockList) => {
    blockList.users.forEach((user) => {
      if (seen.has(user.id)) {
        return;
      }
      seen.add(user.id);
      acc.push(user);
    });
    return acc;
  }, []);

  return {
    id: "",
    infos: infos || blockLists[0].infos,
    users,
  };
}

export function blockListExport(blockLists: BlockList) {
  const users = blockLists.users.map(({ id, name }) => {
    return `${instagramblocklistLabel}${idLabel}${id};${nameLabel}${name}`;
  });

  return [
    `${titleLabel}${blockLists.infos.title}`,
    `${descriptionLabel}${blockLists.infos.description}`,
    ...users,
  ].join("\n");
}

export async function getUserId(url: string) {
  const parsedUrl = new URL(url);
  if (parsedUrl.hostname !== "www.instagram.com") {
    throw new Error("Invalid hostname");
  }

  const data = await fetch(url).then((response) => response.text());
  const userId = data.match(/target_id":"(.*?)"/);
  if (!userId) {
    throw new Error("User ID not found");
  }

  return userId[1];
}

export async function getUserName(url: string) {
  const parsedUrl = new URL(url);
  if (parsedUrl.hostname !== "www.instagram.com") {
    throw new Error("Invalid hostname");
  }
  return parsedUrl.pathname.replaceAll("/", "");
}

export async function getCurrentUser() {
  const tab = await getCurrentTab();
  if (!tab || !tab.url) {
    throw new Error("Invalid tab");
  }

  const user: BlockListUser = {
    id: await getUserId(tab.url),
    name: await getUserName(tab.url),
    blocked: false,
  };
  return user;
}

export async function blockListDownload(
  blockListString: string,
  filename: string = "blocklist"
) {
  const linkElement = document.createElement("a");
  linkElement.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(blockListString)}`
  );
  linkElement.setAttribute("download", `${filename}.txt`);
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
  return Promise.resolve();
}

export function exportBlockLists(blockLists: BlockList[]) {
  blockListDownload(blockListExport(blockListMerge(blockLists)));
}
