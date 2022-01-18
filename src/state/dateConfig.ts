import { createState } from "@hookstate/core";

type DateConfig = {
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
