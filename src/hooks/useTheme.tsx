import { getOptions } from "@/lib/options";
import { useEffect } from "react";

export function useTheme() {
    useEffect(() => {
        (async () => {
            const options = await getOptions();
            document.documentElement.classList.toggle("dark", options.darkMode);
        })();
    }, []);
}
