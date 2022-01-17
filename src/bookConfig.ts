import _ from "lodash";
import { createState } from "@hookstate/core";

import DailyPlan from "./pages/DailyPlan";
import DailyReflect from "./pages/DailyReflect";
import WeeklyPlan from "./pages/WeeklyPlan";
import WeeklyReflect from "./pages/WeeklyReflect";

export const bookConfig = {
  pageUnits: "in",
  pageWidth: 5.5,
  pageHeight: 8.5,
} as const;

export const AppPageConfig = {
  WeeklyReflect,
  DailyPlan,
  WeeklyPlan,
  DailyReflect,
} as const;

export type AppPage = keyof typeof AppPageConfig;

export type AppQuestionState = {
  [P in keyof typeof AppPageConfig]?: typeof AppPageConfig[P]["defaultQuestionConfig"];
};

const defaultQuestionMap = _.mapValues(
  AppPageConfig,
  "defaultQuestionConfig"
) as AppQuestionState;

console.log(defaultQuestionMap);

export const fullAppQuestionMapState = createState(defaultQuestionMap);
