import { DateTime } from "luxon";
import unreachable from "ts-unreachable";
import * as _ from "lodash";

export type Question = {
  text: string;
  when:
    | "daily"
    | "weekday"
    | "weekend"
    | "mon"
    | "tue"
    | "wed"
    | "thu"
    | "fri"
    | "sat"
    | "sun";
};

export function mq(text: string, when: Question["when"] = "daily"): Question {
  return { text, when };
}

function filterQuestion(question: Question, dt: DateTime): boolean {
  const { when } = question;

  if (when === "daily") {
    return true;
  } else if (when === "weekday") {
    return dt.weekday !== 6 && dt.weekday !== 7;
  } else if (when === "weekend") {
    return dt.weekday === 6 || dt.weekday === 7;
  } else if (when === "mon") {
    return dt.weekday === 1;
  } else if (when === "tue") {
    return dt.weekday === 2;
  } else if (when === "wed") {
    return dt.weekday === 3;
  } else if (when === "thu") {
    return dt.weekday === 4;
  } else if (when === "fri") {
    return dt.weekday === 5;
  } else if (when === "sat") {
    return dt.weekday === 6;
  } else if (when === "sun") {
    return dt.weekday === 7;
  } else {
    unreachable(when);
    return false;
  }
}

export function filterQuestions(
  questions: Question[],
  dt: DateTime
): Question[] {
  return questions.filter((question) => filterQuestion(question, dt));
}

export function questionArray(question: QuestionMapValue): Question[] {
  return _.isArray(question) ? question : [question];
}

export type QuestionMap<T extends string> = Record<T, QuestionMapValue>;
type QuestionMapValue = Question[] | Question;

export function chooseOneQuestion(
  question: QuestionMapValue,
  dt: DateTime
): string {
  return (
    _.sample(filterQuestions(questionArray(question), dt))?.text ||
    "no matching question"
  );
}

export function filterQuestionDict<T extends string>(
  questions: QuestionMap<T>,
  dt: DateTime
): QuestionMap<T> {
  return _.mapValues(questions, (value) => {
    if (_.isArray(value)) {
      return filterQuestions(value, dt);
    } else {
      return value;
    }
  });
}
