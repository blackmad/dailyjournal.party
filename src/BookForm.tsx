/* eslint-disable no-console */
import _ from "lodash";
import React from "react";
import { createSchema, Autoform, addTranslations } from "react-hook-form-auto";
import styles from "rhfa-emergency-styles";

import "./styles/rhfa.sass";
import {
  camelCaseToTitleCase,
  makeQuestionMap,
  QuestionMap,
  QuestionWhenOptions,
} from "./utils/question";
import { PageContent } from "./pages/Page";

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

export function PageForm<T extends string>({
  pageContent,
  onChange,
}: {
  pageContent: PageContent<T>;
  onChange: (data: PageContent<T>) => void;
}) {
  const schema = makeSchemaFromQuestionConfig(
    pageContent.title,
    pageContent.questionConfig
  );
  return (
    <Autoform
      onChange={onChange}
      styles={styles}
      schema={schema}
      submitButton
      // onErrors={console.log}
      initialValues={makeQuestionMap(pageContent.questionConfig)}
      config={{ arrayMode: "table" }}
    />
  );
}

export function BookForm({
  pageContents,
}: {
  pageContents: PageContent<any>[];
}) {
  return (
    <div className="flex justify-center">
      <div
        style={{
          maxWidth: 800,
          padding: 20,
        }}
      >
        {pageContents.map((pageContent) => {
          <PageForm pageContent={pageContent} key={pageContent.title} />;
        })}
      </div>
    </div>
  );
}
