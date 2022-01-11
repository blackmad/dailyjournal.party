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
    mq("I am looking forward to ...", "weekend"),
  ],
  gratefulFor: [mq("What am I grateful for today?")],
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
  );
}

const PageContentDefinition: PageContent<keyof typeof questionConfig> = {
  title: "Daily Plan",
  dateCheck: () => true,
  component: DailyPage,
  questionConfig,
};

export default PageContentDefinition;
