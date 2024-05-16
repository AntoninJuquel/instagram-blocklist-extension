import { getAllCookies } from "./cookies";
import { BlockList } from "./types";

export async function enableBlockLists(blockLists: Array<BlockList>) {
  try {
    const cookies = await getAllCookies("https://www.instagram.com");
    for (const blockList of blockLists) {
      for (const user of blockList.users) {
        const csrftoken = cookies.find(
          (cookie) => cookie.name === "csrftoken"
        )?.value;
        if (!csrftoken) {
          throw new Error("No csrftoken found");
        }
        await fetch(
          `https://www.instagram.com/api/v1/web/friendships/${user.id}/block/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-CSRFToken": csrftoken,
              Cookie: cookies
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join("; ")
            }
          }
        );
      }
    }
  } catch (e) {}
}
