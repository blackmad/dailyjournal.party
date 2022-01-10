import React from "react";
import { OpenBoxWithTitle, OpenDottedBox } from "../components/OpenBox";
import { PageContent, PageContentProps, PageGrid } from "./Page";

function DailyReflect(_props: PageContentProps) {
  return (
    <PageGrid>
      <OpenBoxWithTitle className="col-span-12" title="WHO is your daddy" />

      <OpenBoxWithTitle className="col-span-4" title="who is your daddy" />
      <OpenBoxWithTitle className="col-span-4" title="who IS your daddy" />
      <OpenBoxWithTitle className="col-span-4" title="who is YOUR daddy" />

      <OpenDottedBox className="col-span-12" title="who is your DADDY" />
    </PageGrid>
  );
}

const PageContentDefinition: PageContent = {
  title: "Daily Reflect",
  dateCheck: () => true,
  component: DailyReflect,
};

export default PageContentDefinition;
