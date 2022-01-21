import _ from "lodash";
import React from "react";
import { OpenDottedBox } from "../book-components/OpenBox";
import { Header } from "../book-components/Header";
// import { mq } from "../utils/question";
import { PageContent, PageGrid } from "./Page";
import { QuestionMap } from "../utils/question";

const title = "Daily Reflect";

const QuestionKeys = [
  "gratefulFor",
  "growth",
  "presence",
  "bad",
  "relationships",
  "selfKindness",
  "highlights",
] as const;
type Questions = typeof QuestionKeys[number];
export const defaultQuestionConfig: QuestionMap<Questions> = {
  gratefulFor: ["What was I grateful for today?"],
  growth: [
    "What areas of growth did I express well today?",
    "What did I learn today?",
  ],
  presence: [
    "How present did I feel today?",
    "What details did I notice today?",
    "How did my body feel today?",
  ],
  bad: [
    "What sucked about today?",
    "How did I mug myself today?",
    "How was I unkind to future me today?",
    "What was challenging today?",
    "Here is a place to vent ...",
  ],
  relationships: [
    "What relationships do I want to be investing more in?",
    "What relationships in my life are filling me up?",
    "What positive relationships did I contribute to today?",
    "How was I kind to others today?",
    "How was I helpful to others today?",
  ],
  selfKindness: [
    "How was I kind to myself today?",
    "What self-talk served me well today?",
    "What am I proud of about myself today?",
  ],
  highlights: ["Highlights", "What was awesome about today?"],
};

function DailyReflect({
  questionConfig,
}: {
  questionConfig: QuestionMap<Questions>;
}) {
  return (
    <>
      <Header title={title} />

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
  dateCheck: () => true,
  component: DailyReflect,
  defaultQuestionConfig,
  key: "DailyReflect",
} as const;

export default PageContentDefinition;
