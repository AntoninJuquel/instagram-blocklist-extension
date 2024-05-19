import { getAllCookies } from "@/services/chrome/cookies";
import { BlockList } from "./types";
import { errorLog } from "@/utils/log";

export async function toggleBlockLists(
  blockLists: BlockList[],
  enable: boolean,
  onSuccess: (
    blockListID: string,
    userIndex: number
  ) => Promise<boolean> | boolean
) {
  try {
    const cookies = await getAllCookies("https://www.instagram.com");

    const csrftoken = cookies.find(
      (cookie) => cookie.name === "csrftoken"
    )?.value;

    if (!csrftoken) {
      throw new Error("No csrftoken found");
    }

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": csrftoken,
      Cookie: cookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    };

    const action = enable ? "block" : "unblock";

    for (let i = 0; i < blockLists.length; i++) {
      const blockList = blockLists[i];
      for (let j = 0; j < blockList.users.length; j++) {
        const user = blockList.users[j];
        if (user.blocked === enable) {
          continue;
        }
        await fetch(
          `https://www.instagram.com/api/v1/web/friendships/${user.id}/${action}/`,
          {
            method: "POST",
            headers,
          }
        );

        if (!(await onSuccess(blockList.id, j))) break;

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  } catch (e) {
    errorLog("blockList", "Failed to enable blocklists", e);
  }
}
