import {
  descriptionLabel,
  idLabel,
  instagramblocklistLabel,
  nameLabel,
  titleLabel
} from "./blockListFile";
import { BlockList, BlockListInfo, BlockListUser } from "./types";

export function blockListMerge(
  blockLists: Array<BlockList>,
  infos?: BlockListInfo
) {
  const seen = new Set();

  const users = blockLists.reduce<Array<BlockListUser>>((acc, blockList) => {
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
    infos: infos || blockLists[0].infos,
    users
  };
}

export function blockListExport(blockLists: BlockList) {
  const users = blockLists.users.map(({ id, name }) => {
    return `${instagramblocklistLabel}${idLabel}${id};${nameLabel}${name}`;
  });

  return [
    `${titleLabel}${blockLists.infos.title}`,
    `${descriptionLabel}${blockLists.infos.description}`,
    ...users
  ].join("\n");
}

export async function getUserId(url: string) {
  const data = await fetch(url).then((response) => response.text());
  if (data.includes("target_id") === true) {
    console.log("Target ID found in HTML");
    const userId = data.match(/target_id":"(.*?)"/);

    if (!userId) {
      console.log("No target ID found");
      return;
    }

    return userId[1];
  }
}

export async function getUserName(url: string) {
  return new URL(url).pathname.replaceAll("/", "");
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
