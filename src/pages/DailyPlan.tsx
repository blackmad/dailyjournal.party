import React from "react";
import styled from "styled-components";
import { AbstractBox } from "../components/AbstractBox";
import {
  BorderBox,
  BorderDottedBox,
  BorderRuledBox,
  BoxTitle,
} from "../components/BorderBox";
import { OpenDottedBox } from "../components/OpenBox";
import {
  chooseOneQuestion,
  filterQuestionDict,
  mq,
  Question,
  questionArray,
} from "../utils/question";
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

const BlankLine = styled.div`
  height: 1em;
  border-bottom: 1px solid black;
  width: 70%;
  flex-grow: 1;
`;

function GridLineMultiBox({
  questions: _questions,
}: {
  questions: Question[] | Question;
}) {
  const questions = questionArray(_questions);

  return (
    <>
      {questions.map((question) => {
        return (
          <AbstractBox
            className={`col-span-${12 / questions.length}`}
            title={question.text}
            TitleBoxComponent={BoxTitle}
            ContentBoxComponent={BorderBox}
          >
            <div className="flex flex-col items-center justify-between h-full pt-[5%] pb-[10%]">
              <BlankLine />
              <BlankLine />
              <BlankLine />
            </div>
          </AbstractBox>
        );
      })}
    </>
  );
}

function DailyPage(props: PageContentProps) {
  const { dt } = props;
  const filteredQuestionConfig = filterQuestionDict(questionConfig, dt);

  return (
    <PageGrid>
      <GridLineMultiBox
        questions={filteredQuestionConfig.dailyThreeUpQuestions}
      />

      <BorderDottedBox
        className="col-span-12"
        title={chooseOneQuestion(
          filteredQuestionConfig.iAmLookingForwardTo,
          dt
        )}
      />

      <BorderDottedBox
        className="col-span-12"
        title={chooseOneQuestion(filteredQuestionConfig.todayPlan, dt)}
      />

      <BorderRuledBox
        className="col-span-6"
        title={chooseOneQuestion(filteredQuestionConfig.gratefulFor, dt)}
      />

      <OpenDottedBox className="col-span-6 row-span-2" title="Notes" />

      <BorderRuledBox
        className="col-span-6"
        title={chooseOneQuestion(filteredQuestionConfig.positiveSelfTalk, dt)}
      />
    </PageGrid>
  );
}

const PageContentDefinition: PageContent = {
  title: "Daily Plan",
  dateCheck: () => true,
  component: DailyPage,
};

export default PageContentDefinition;
