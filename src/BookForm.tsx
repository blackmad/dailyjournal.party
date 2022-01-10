import _ from "lodash";
import React from "react";
import { createSchema, Autoform, addTranslations } from "react-hook-form-auto";
// import { createSchema, Autoform } from "rhfa-blueprint";
import styles from "rhfa-emergency-styles";

// With sass...
// import "rhfa-emergency-styles/prefixed.sass";
// ...or without
import "rhfa-emergency-styles/dist/styles.css";
import DailyReflect from "./pages/DailyReflect";
import {
  makeQuestionMap,
  QuestionMap,
  QuestionWhenOptions,
} from "./utils/question";

const questionSchema = createSchema("question", {
  text: {
    type: "string",
    required: true,
  },
  when: {
    type: "select",
    options: QuestionWhenOptions,
  },
});

const WhenTranslations: Record<typeof QuestionWhenOptions[number], string> = {
  daily: "Every day",
  weekday: "Weekdays",
  weekend: "Weekends",
  mon: "Mondays",
  tue: "Tuesdays",
  wed: "Wednesdays",
  thu: "Thursdays",
  fri: "Fridays",
  sat: "Saturdays",
  sun: "Sundays",
};

addTranslations({
  models: {
    question: {
      text: {
        _field: "Text",
      },
      when: {
        _field: "When",
        _default: "Default",
        ...WhenTranslations,
      },
    },
  },
});

function makeSchemaFromQuestionConfig<T extends string>(
  name: string,
  questionConfig: QuestionMap<T>
) {
  const schema: Record<string, any> = {};
  _.forEach(questionConfig, (value, key) => {
    // const qa = questionArray(value);
    schema[key] = {
      type: [questionSchema],
      required: true,
    };
  });
  console.log({ schema });
  return createSchema(name, schema);
}

export function BookForm() {
  const schema = makeSchemaFromQuestionConfig(
    DailyReflect.title,
    DailyReflect.questionConfig
  );
  return (
    <Autoform
      onChange={console.log}
      onBlur={console.log}
      onSubmit={console.log}
      styles={styles}
      schema={schema}
      submitButton
      onErrors={console.log}
      initialValues={makeQuestionMap(DailyReflect.questionConfig)}
      config={{ arrayMode: "table" }}
    />
  );
}
