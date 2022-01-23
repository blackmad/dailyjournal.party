import { createState } from "@hookstate/core";
import { defaultTheme } from "../theme";

export const themeConfig = createState(defaultTheme);
