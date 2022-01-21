import React from "react";

import { AbstractBox } from "../book-components/AbstractBox";
import {
  BorderBox,
  BorderDottedBox,
  BorderRuledBox,
  BoxTitle,
} from "../book-components/BorderBox";
import { OpenDottedBox } from "../book-components/OpenBox";
import ThreeLineBoxContents from "../book-components/ThreeLineBoxContents";
import {
  filterQuestions,
  mq,
  QuestionMap,
  QuestionMapValue,
} from "../utils/question";
import { PageContent, PageGrid } from "./Page";
import { Header } from "../book-components/Header";
import { DateContext } from "../providers/DateContext";

const title = "Daily Plan";

const QuestionKeys = [
  "dailyThreeUp",
  "iAmLookingForwardTo",
  "todayPlan",
  "gratefulFor",
  "positiveSelfTalk",
] as const;
type Questions = typeof QuestionKeys[number];
export const defaultQuestionConfig: QuestionMap<Questions> = {
  dailyThreeUp: [
    mq("Work", "weekday"),
    mq("Home", "weekend"),
    mq("Personal", "daily"),
    mq("Habits", "daily"),
  ],
  iAmLookingForwardTo: [mq("I am looking forward to ...")],
  todayPlan: [
    mq("What I love about my job is ...", "weekday"),
    mq("How can I be a good leader today?", "weekday"),
    mq("What can I do to work more efficiently today?", "weekday"),
    mq("Today I am going to relax by ...", "weekend"),
    mq("I am going to disconnect from work by ...", "weekend"),
  ],
  gratefulFor: [mq("I am grateful for ...")],
  positiveSelfTalk: [mq("Today's positive self-talk")],
};

function GridLineMultiBox({
  questions: _questions,
}: {
  questions: QuestionMapValue;
}) {
  const { dt } = React.useContext(DateContext);
  const questions = filterQuestions(_questions, dt);

  return (
    <>
      {questions.map((question) => {
        return (
          <AbstractBox
            className={`col-span-${12 / questions.length}`}
            question={question}
            TitleBoxComponent={BoxTitle}
            ContentBoxComponent={BorderBox}
            key={question.text}
          >
            <ThreeLineBoxContents />
          </AbstractBox>
        );
      })}
    </>
  );
}

function DailyPage({
  questionConfig,
}: {
  questionConfig: QuestionMap<Questions>;
}) {
  return (
    <>
      <Header title={title} />
      <PageGrid>
        <GridLineMultiBox questions={questionConfig.dailyThreeUp} />

        <BorderDottedBox
          className="col-span-12"
          question={questionConfig.iAmLookingForwardTo}
        />

        <BorderDottedBox
          className="col-span-12"
          question={questionConfig.todayPlan}
        />

        <BorderRuledBox
          className="col-span-6"
          question={questionConfig.gratefulFor}
          numLines={6}
        />

        <OpenDottedBox className="col-span-6 row-span-2" question="Notes" />

        <BorderRuledBox
          className="col-span-6"
          numLines={6}
          question={questionConfig.positiveSelfTalk}
        />
      </PageGrid>
    </>
  );
}

const PageContentDefinition: PageContent<Questions> = {
  title,
  dateCheck: () => true,
  component: DailyPage,
  defaultQuestionConfig,
  key: "DailyPlan",
} as const;

export default PageContentDefinition;
