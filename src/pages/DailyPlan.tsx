import React from "react";
import { DateContext } from "../providers/DateContext";
import { AbstractBox } from "../components/AbstractBox";
import {
  BorderBox,
  BorderDottedBox,
  BorderRuledBox,
  BoxTitle,
} from "../components/BorderBox";
import { OpenDottedBox } from "../components/OpenBox";
import ThreeLineBoxContents from "../components/ThreeLineBoxContents";
import { filterQuestions, mq, QuestionMapValue } from "../utils/question";
import { PageContent, PageContentProps, PageGrid } from "./Page";
import { Header } from "../Header";

const title = "Daily Plan";

export const questionConfig = {
  dailyThreeUpQuestions: [
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

function DailyPage(_props: PageContentProps) {
  return (
    <>
      <Header title={title} />
      <PageGrid>
        <GridLineMultiBox questions={questionConfig.dailyThreeUpQuestions} />

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
        />

        <OpenDottedBox className="col-span-6 row-span-2" question="Notes" />

        <BorderRuledBox
          className="col-span-6"
          question={questionConfig.positiveSelfTalk}
        />
      </PageGrid>
    </>
  );
}

const PageContentDefinition: PageContent<keyof typeof questionConfig> = {
  title,
  dateCheck: () => true,
  component: DailyPage,
  questionConfig,
};

export default PageContentDefinition;
