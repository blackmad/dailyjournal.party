/* eslint-disable no-console */
import _ from "lodash";
import React from "react";
import { createSchema, Autoform, addTranslations } from "react-hook-form-auto";
// import { createSchema, Autoform } from "rhfa-blueprint";
import styles from "rhfa-emergency-styles";

// With sass...
import "./styles/rhfa.sass";
// ...or without
// import "rhfa-emergency-styles/dist/styles.css";
import DailyReflect from "./pages/DailyReflect";
import {
  camelCaseToTitleCase,
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
  questionConfig: QuestionMap<T>,
  questionTranslations?: Partial<Record<T, string>>
) {
  const schema: Record<string, any> = {};
  const translations: Partial<Record<T, string>> = {};

  _.forEach(questionConfig, (value, key) => {
    // const qa = questionArray(value);
    schema[key] = {
      type: [questionSchema],
      required: true,
    };

    const questionName =
      questionTranslations?.[key as T] ||
      `"${camelCaseToTitleCase(key)}" Questions`;
    translations[key as T] = `${name}: ${questionName}`;
  });

  const translationsToAdd = {
    models: {} as any,
  };
  translationsToAdd.models[name] = translations;

  addTranslations(translationsToAdd);

  console.log({ schema });
  return createSchema(name, schema);
}

export function BookForm() {
  const schema = makeSchemaFromQuestionConfig(
    DailyReflect.title,
    DailyReflect.questionConfig
  );
  return (
    <div className="flex justify-center">
      <div
        style={{
          maxWidth: 800,
          padding: 20,
        }}
      >
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
      </div>
    </div>
  );
}
