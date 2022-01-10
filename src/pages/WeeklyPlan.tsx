import { DateTime } from "luxon";
import React from "react";
import { BorderDottedBox, BorderRuledBox } from "../components/BorderBox";
import { PageContent, PageContentProps, PageGrid } from "./Page";

function WeekPlan(_props: PageContentProps) {
  return (
    <PageGrid>
      <BorderDottedBox className="col-span-12" title="week is your daddy" />

      <BorderDottedBox className="col-span-4" title="week is your daddy" />
      <BorderDottedBox className="col-span-4" title="week is your daddy" />
      <BorderDottedBox className="col-span-4" title="week is your daddy" />

      <BorderRuledBox className="col-span-12" title="week is your daddy" />
    </PageGrid>
  );
}

const PageContentDefinition: PageContent = {
  title: "Weekly Plan",
  dateCheck: (dt: DateTime) => {
    // 1 = monday, 7 = sunday
    return dt.weekday === 7;
  },
  component: WeekPlan,
};

export default PageContentDefinition;
