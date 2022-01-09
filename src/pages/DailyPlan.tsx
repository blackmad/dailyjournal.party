import React from "react";
import { DottedBox } from "../components/DottedBox";
import { PageContent, PageContentProps, PageGrid } from "./Page";

function DailyPage(_props: PageContentProps) {
  return (
    <PageGrid>
      <DottedBox className="col-span-12" title="who is your daddy" />

      <DottedBox className="col-span-4" title="who is your daddy" />
      <DottedBox className="col-span-4" title="who is your daddy" />
      <DottedBox className="col-span-4" title="who is your daddy" />

      <DottedBox className="col-span-12" title="who is your daddy" />
    </PageGrid>
  );
}

const PageContentDefinition: PageContent = {
  title: "Daily Plan",
  dateCheck: () => true,
  component: DailyPage,
};

export default PageContentDefinition;
