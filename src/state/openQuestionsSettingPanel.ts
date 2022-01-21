import { createState } from "@hookstate/core";
import { AppPage } from "../bookConfig";

export const openQuestionsSettingPanel = createState<AppPage | undefined>(
  undefined
);
