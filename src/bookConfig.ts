import _ from "lodash";
import { createState } from "@hookstate/core";
import { Interval } from "luxon";
import { Persistence } from "@hookstate/persistence";

import DailyPlan from "./bookPages/DailyPlan";
import DailyReflect from "./bookPages/DailyReflect";
import WeeklyPlan from "./bookPages/WeeklyPlan";
import WeeklyReflect from "./bookPages/WeeklyReflect";

import { getTimeRange, DateConfig } from "./state/dateConfig";
import { MyStateWatchPlugin } from "./state/persistUtil";
import { BackCover, EmptyPage, FrontCover } from "./bookPages/Cover";
import { PageContent } from "./bookPages/Page";

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

export const AllAppPages = {
  ...AppPageConfig,
  FrontCover,
  BackCover,
  EmptyPage,
} as const;

export const AppPages = Object.values(AppPageConfig);

export type AppPage = keyof typeof AllAppPages;

export type AppQuestionState = {
  [P in AppPage]?: typeof AllAppPages[P]["defaultQuestionConfig"];
};

export const defaultQuestionMap = _.mapValues(
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
          pageKey: pageContentKey as PageContent<any>["key"],
          pageContent: pageContent as any,
          key: `${pageContent.title}-${date}`,
        };
      }
    });
  });

  const FrontCoverPage = {
    date: startDate,
    pageKey: FrontCover.key,
    pageContent: FrontCover,
    key: `${FrontCover.title}-${startDate}`,
  };

  const EmptyPagePage = {
    date: startDate,
    pageKey: EmptyPage.key,
    pageContent: EmptyPage,
    key: `${EmptyPage.title}-${Math.random()}`,
  };

  const BackCoverPage = {
    date: endDate,
    pageKey: BackCover.key,
    pageContent: BackCover,
    key: `${BackCover.title}-${startDate}`,
  };

  const includeFrontCover = true;
  const includeBackCover = true;

  if (includeFrontCover) {
    pages.unshift(FrontCoverPage);
  }

  if (includeBackCover) {
    pages.push(BackCoverPage);
  }

  let needToAdd = pages.length % 4;

  // If we need to add any blank pages, opt to start by making the
  // front cover have a blank back
  if (needToAdd > 0) {
    if (includeFrontCover) {
      pages.splice(1, 0, EmptyPagePage);
      needToAdd -= 1;
    }
  }

  // if we still need to add pages, make sure the back cover is the back
  if (needToAdd > 0) {
    if (includeBackCover) {
      _.times(needToAdd, () => {
        pages.splice(pages.length - 1, 0, EmptyPagePage);
      });
      needToAdd = 0;
    }
  }

  return pages;
}

export type GeneratedPages = ReturnType<typeof generatePages>;
export type GeneratedPage = GeneratedPages[number];
