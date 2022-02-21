import { DateTime } from "luxon";

export const weeklyDateCheck = (dt: DateTime) => {
  // 1 = monday, 7 = sunday
  return dt.weekday === 7;
};
