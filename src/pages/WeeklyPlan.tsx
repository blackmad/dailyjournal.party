import { Info } from "luxon";
import React from "react";
import styled from "styled-components";
import { BasicBorder, BorderBoxWithTitle } from "../components/BorderBox";
import { OpenBackgroundBox, OpenDottedBox } from "../components/OpenBox";
import ThreeLineBoxContents from "../components/ThreeLineBoxContents";
import { Header } from "../Header";
import { PageContent, PageContentProps, PageGrid } from "./Page";
import { weeklyDateCheck } from "./pageUtils";

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  row-gap: 0.5em;
  column-gap: 0.5em;
`;

const WeekName = styled(OpenBackgroundBox)`
  display: flex;
  align-items
`;

const questionConfig = {};

const title = "Weekly Plan";

const WeekBox = styled(BasicBorder)``;

function WeekGrid({ className }: { className: string }) {
  // TODO: configure this to start on the right day
  return (
    <WeekContainer className={className}>
      {Info.weekdays().map((weekday) => {
        return (
          <React.Fragment key={weekday}>
            <WeekName
              key={`${weekday}-name`}
              className="flex align-middle justify-center items-center"
            >
              {weekday}
            </WeekName>
            <WeekBox key={`${weekday}-box`} />
          </React.Fragment>
        );
      })}
    </WeekContainer>
  );
}

function WeekPlan(_props: PageContentProps) {
  return (
    <>
      <Header title={title} omitDay />

      <PageGrid>
        <WeekGrid className="col-span-8 row-span-4" />
        <OpenDottedBox className="col-span-4 row-span-2" question="Todo" />
        <BorderBoxWithTitle
          className="col-span-4 row-span-2"
          question="Goal for the week"
        />

        <BorderBoxWithTitle
          className="col-span-12"
          question="Top 3 personal goals this week"
        >
          <ThreeLineBoxContents />
        </BorderBoxWithTitle>

        <BorderBoxWithTitle
          className="col-span-12"
          question="Top 3 professional goals this week"
        >
          <ThreeLineBoxContents />
        </BorderBoxWithTitle>

        {/* <BorderDottedBox className="col-span-12" title="week is your daddy" />

      <BorderDottedBox className="col-span-4" title="week is your daddy" />
      <BorderDottedBox className="col-span-4" title="week is your daddy" />
      <BorderDottedBox className="col-span-4" title="week is your daddy" />

       */}
      </PageGrid>
    </>
  );
}

const PageContentDefinition: PageContent<keyof typeof questionConfig> = {
  title,
  dateCheck: weeklyDateCheck,
  component: WeekPlan,
  questionConfig,
};

export default PageContentDefinition;
