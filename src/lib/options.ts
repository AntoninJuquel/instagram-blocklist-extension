import { z } from "zod";
import * as chromeStorage from "@/services/chrome/storage";

export const optionsSchema = z.object({
  delayBetweenRequests: z.preprocess(
    (value) => parseInt(value as string, 10),
    z
      .number({
        required_error: "Delay Between Requests is required.",
        invalid_type_error: "Delay Between Requests must be a number.",
      })
      .int()
      .positive()
      .min(1)
  ),
  darkMode: z.boolean(),
  autoUpdate: z.boolean(),
});

export type Options = z.infer<typeof optionsSchema>;

export const defaultOptions: Options = {
  delayBetweenRequests: 5000,
  darkMode: false,
  autoUpdate: true,
};

export async function getOptions() {
  return (await chromeStorage.getItem<Options>("options")) || defaultOptions;
}

export async function setOptions(options: Options) {
  await chromeStorage.setItem("options", options);
}

export async function initializeOptions() {
  await setOptions(defaultOptions);
}
