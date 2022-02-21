import _ from "lodash";
import React from "react";

import { OpenDottedBox } from "../book-components/OpenBox";
// import { mq } from "../utils/question";
import { Header } from "../book-components/Header";
import { PageContent, PageGrid } from "./Page";
import { weeklyDateCheck } from "./pageUtils";
import { QuestionMap } from "../utils/question";

const QuestionKeys = [
  "completedThisWeek",
  "goingWell",
  "improve",
  "timeUse",
  "challenging",
  "highlights",
] as const;
type Questions = typeof QuestionKeys[number];
export const defaultQuestionConfig: QuestionMap<Questions> = {
  completedThisWeek: ["What projects have I made progress on this week?"],
  goingWell: ["What went well this week and why?"],
  improve: [
    "What’s one thing I can do next week that wil create the biggest results in my life?",
  ],
  timeUse: ["How am I using my time? How can I prioritize better?"],
  challenging: [
    "What’s most chalenging and how can I turn it into an oppportunity?",
  ],
  highlights: ["What were my favorite moments from this week?"],
};

const title = "Weekly Reflect";

function WeeklyReflect({
  questionConfig,
}: {
  questionConfig: QuestionMap<Questions>;
}) {
  return (
    <>
      <Header title={title} omitDay />
      <PageGrid style={{ gap: 0 }}>
        {_.map(questionConfig, (q, key) => {
          return (
            <OpenDottedBox className="col-span-12" question={q} key={key} />
          );
        })}
      </PageGrid>
    </>
  );
}

const PageContentDefinition: PageContent<Questions> = {
  title,
  dateCheck: weeklyDateCheck,
  component: WeeklyReflect,
  defaultQuestionConfig,
  key: "WeeklyReflect",
} as const;

export default PageContentDefinition;
