/* eslint-disable no-console */
import _ from "lodash";
import React, { useEffect } from "react";
import { createSchema, Autoform, addTranslations } from "react-hook-form-auto";
import styles from "rhfa-emergency-styles";
import { createState } from "@hookstate/core";

import "./styles/rhfa.sass";
import {
  camelCaseToTitleCase,
  FullAppQuestionMap,
  makeQuestionMap,
  QuestionMap,
  QuestionWhenOptions,
} from "./utils/question";
import { PageContent } from "./pages/Page";
import { questionMapState } from "./bookConfig";

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
  onChange: (data: PageContent<T>["defaultQuestionConfig"]) => void;
}) {
  const schema = makeSchemaFromQuestionConfig(
    pageContent.title,
    pageContent.defaultQuestionConfig
  );
  return (
    <Autoform
      onChange={onChange}
      styles={styles}
      schema={schema}
      submitButton
      // onErrors={console.log}
      initialValues={makeQuestionMap(pageContent.defaultQuestionConfig)}
      config={{ arrayMode: "table" }}
    />
  );
}

export const fullAppQuestionMapState = createState({} as FullAppQuestionMap);

export function BookForm({
  pageContents,
}: {
  pageContents: PageContent<any>[];
}) {
  useEffect(() => {
    const defaultQuestionMapState = {} as FullAppQuestionMap;

    pageContents.forEach((pageContent) => {
      defaultQuestionMapState[pageContent.title] =
        pageContent.defaultQuestionConfig;
    });
    fullAppQuestionMapState.set(defaultQuestionMapState);
  }, [pageContents]);

  return (
    <div className="flex justify-center">
      <div
        style={{
          maxWidth: 800,
          padding: 20,
        }}
      >
        {pageContents.map((pageContent) => {
          return (
            <PageForm
              pageContent={pageContent}
              key={pageContent.title}
              onChange={(newMap) => {
                const newState = {} as Partial<FullAppQuestionMap>;
                newState[pageContent.title] = newMap;
                questionMapState.merge(newState);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
