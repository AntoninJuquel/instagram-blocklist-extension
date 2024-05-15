export async function getAllCookies(
  url: string
): Promise<chrome.cookies.Cookie[]> {
  return await new Promise((resolve, reject) => {
    chrome.cookies.getAll(
      {
        url
      },
      (cookies) => {
        if (cookies) {
          resolve(cookies);
        } else {
          reject(new Error("No cookies found"));
        }
      }
    );
  });
}
