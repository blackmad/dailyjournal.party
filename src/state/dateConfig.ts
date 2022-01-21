import { createState } from "@hookstate/core";
import { DateTime } from "luxon";

export type DateConfig = {
  startDate: string | undefined;
  numDays: number | undefined;
  endDate: string | undefined;
  weeklyReviewOn: "saturday" | "sunday";
  weeklyPlanOn: "saturday" | "sunday";
  monthlyOn: "saturdayOfLastWeek" | "sundayOfLastWeek" | "lastDayOfMonth";
};

const defaultDateConfig: DateConfig = {
  startDate: undefined,
  numDays: 7,
  endDate: undefined,
  weeklyReviewOn: "sunday",
  weeklyPlanOn: "sunday",
  monthlyOn: "lastDayOfMonth",
};

export const dateConfig = createState(defaultDateConfig);

export function getTimeRange(dc: DateConfig) {
  const { startDate: startDateString, endDate: endDateString } = dc;

  const startDate = startDateString
    ? DateTime.fromISO(startDateString)
    : DateTime.fromJSDate(new Date());
  const endDate = endDateString
    ? DateTime.fromISO(endDateString)
    : startDate.plus({ days: 7 });

  return { startDate, endDate };
}
