import React from "react";
import { BorderDottedBox, BorderRuledBox } from "../components/BorderBox";
import { PageContent, PageContentProps, PageGrid } from "./Page";

function DailyPage(_props: PageContentProps) {
  return (
    <PageGrid>
      <BorderDottedBox className="col-span-12" title="who is your daddy" />

      <BorderDottedBox className="col-span-4" title="who is your daddy" />
      <BorderDottedBox className="col-span-4" title="who is your daddy" />
      <BorderDottedBox className="col-span-4" title="who is your daddy" />

      <BorderRuledBox className="col-span-12" title="who is your daddy" />
    </PageGrid>
  );
}

const PageContentDefinition: PageContent = {
  title: "Daily Plan",
  dateCheck: () => true,
  component: DailyPage,
};

export default PageContentDefinition;
