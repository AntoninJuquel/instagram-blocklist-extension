import { timer, warnLog } from "../utils/log";
import { BlockList, BlockListUser } from "./types";

/**
 * The title should follow the following format:
 * title:This Is My Source File Title.
 */
export const titleLabel = "title:";
/**
 * The description should follow the following format:
 * description:This Is My Source File Description And Maybe It Is Longer.
 */
export const descriptionLabel = "description:";
/**
 * The instagram block list should follow the following format:
 * instagramblocklist:id=123456789;name=example
 */
export const instagramblocklistLabel = "instagramblocklist:";
/**
 * The id should follow the following format:
 * id=123456789
 */
export const idLabel = "id=";
/**
 * The name should follow the following format:
 * name=example
 */
export const nameLabel = "name=";
/**
 * Extracts id, names, title, and description from the meat of
 * one or more block list text files, deduplicating within
 * and between lists.
 */
export function toBlockList(
  ...files: Array<[url: string | undefined, contents: string]>
): Array<BlockList> {
  const stopTimer = timer("Parse block list");
  try {
    const blockLists: Array<BlockList> = [];

    for (const [url, fileText] of files) {
      const blockList: BlockList = {
        users: [],
        infos: {
          url,
          title: undefined,
          description: undefined,
          numUsers: 0
        }
      };
      const seen = new Set<string>();
      let dupes = 0;

      const lines = fileText.split(/\r?\n/);

      for (const line of lines) {
        if (!blockList.infos.title && line.startsWith(titleLabel)) {
          blockList.infos.title = line.slice(titleLabel.length);
        } else if (
          !blockList.infos.description &&
          line.startsWith(descriptionLabel)
        ) {
          blockList.infos.description = line.slice(descriptionLabel.length);
        } else {
          const user = toBlockListUser(line);

          if (user) {
            const { id } = user;

            if (!seen.has(id)) {
              seen.add(id);
              blockList.users.push(user);
              blockList.infos.numUsers++;
            } else {
              dupes++;
            }
          }
        }
      }

      if (dupes > 0) {
        warnLog(
          "blocklistFile",
          "Discarded",
          dupes,
          "duplicate users from block list"
        );
      }
      blockLists.push(blockList);
    }
    return blockLists;
  } finally {
    stopTimer();
  }
}
const instagramBlockListRegex = /^instagramblocklist:id=\d+;name=[A-Za-z0-9]+/;
function toBlockListUser(line: string): BlockListUser | undefined {
  if (instagramBlockListRegex.test(line)) {
    const [id, name] = line.split(";");
    return {
      id: id.slice("instagramblocklist:id=".length),
      name: name.slice("name=".length)
    };
  }
  return undefined;
}
