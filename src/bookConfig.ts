import _ from "lodash";
import { createState } from "@hookstate/core";

import DailyPlan from "./pages/DailyPlan";
import DailyReflect from "./pages/DailyReflect";
import WeeklyPlan from "./pages/WeeklyPlan";
import WeeklyReflect from "./pages/WeeklyReflect";

const defaultPrintConfig = {
  pageUnits: "in" as "in" | "mm",
  pageWidth: 11 as number,
  pageHeight: 8.5 as number,
  doubleSidedPrinting: true as boolean,
} as const;

export type PrintConfig = typeof defaultPrintConfig;

export const printConfig = createState(defaultPrintConfig);

export const AppPageConfig = {
  WeeklyReflect,
  DailyPlan,
  WeeklyPlan,
  DailyReflect,
} as const;

export type AppPage = keyof typeof AppPageConfig;

export type AppQuestionState = {
  [P in AppPage]?: typeof AppPageConfig[P]["defaultQuestionConfig"];
};

const defaultQuestionMap = _.mapValues(
  AppPageConfig,
  "defaultQuestionConfig"
) as AppQuestionState;

export const fullAppQuestionMapState = createState(defaultQuestionMap);
