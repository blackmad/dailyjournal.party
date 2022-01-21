/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { createState } from "@hookstate/core";
import { DateTime, Interval } from "luxon";

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
  // WeeklyReflect,
  DailyPlan,
  // WeeklyPlan,
  // DailyReflect,
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

export function generatePages(
  startDateString: string | undefined,
  endDateString: string | undefined
) {
  const startDate = startDateString
    ? DateTime.fromISO(startDateString)
    : DateTime.fromJSDate(new Date());
  const endDate = endDateString
    ? DateTime.fromISO(endDateString)
    : startDate.plus({ days: 7 });

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
