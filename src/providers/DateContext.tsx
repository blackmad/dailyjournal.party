import React from "react";

import { DateTime } from "luxon";

export const DateContext = React.createContext<{ dt: DateTime }>({
  dt: DateTime.fromJSDate(new Date()),
});
