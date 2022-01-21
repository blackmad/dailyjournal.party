import _ from "lodash";
import { createState } from "@hookstate/core";
import { Interval } from "luxon";
import { Persistence } from "@hookstate/persistence";

import DailyPlan from "./pages/DailyPlan";
import DailyReflect from "./pages/DailyReflect";
import WeeklyPlan from "./pages/WeeklyPlan";
import WeeklyReflect from "./pages/WeeklyReflect";
import { getTimeRange, DateConfig } from "./state/dateConfig";
import { MyStateWatchPlugin } from "./state/persistUtil";

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

export const AppPages = Object.values(AppPageConfig);

export type AppPage = keyof typeof AppPageConfig;

export type AppQuestionState = {
  [P in AppPage]?: typeof AppPageConfig[P]["defaultQuestionConfig"];
};

const defaultQuestionMap = _.mapValues(
  AppPageConfig,
  "defaultQuestionConfig"
) as AppQuestionState;

export const fullAppQuestionMapState = createState(defaultQuestionMap);
fullAppQuestionMapState.attach(MyStateWatchPlugin);
fullAppQuestionMapState.attach(Persistence("fullAppQuestionMapState"));

export function generatePages(dc: DateConfig) {
  const { startDate, endDate } = getTimeRange(dc);

  const interval = Interval.fromDateTimes(startDate, endDate).splitBy({
    days: 1,
  });

  const pages = interval.flatMap((date) => {
    return _.entries(AppPageConfig).flatMap(([pageContentKey, pageContent]) => {
      const { dateCheck } = pageContent;
      if (!dateCheck(date.start)) {
        return [];
      } else {
        return {
          date: date.start,
          pageKey: pageContentKey as AppPage,
          pageContent: pageContent as any,
          key: `${pageContent.title}-${date}`,
        };
      }
    });
  });

  return pages;
}

export type GeneratedPages = ReturnType<typeof generatePages>;
export type GeneratedPage = GeneratedPages[number];
