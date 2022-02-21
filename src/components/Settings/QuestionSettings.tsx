/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useState } from "@hookstate/core";

import { ControlPanelSection } from "./ControlPanelSection";
import { PageForm } from "./BookForm";
import {
  AppPages,
  defaultQuestionMap,
  fullAppQuestionMapState,
} from "../../bookConfig";
import { openQuestionsSettingPanel } from "../../state/openQuestionsSettingPanel";

export function QuestionSettings() {
  const fullAppQuestionMap = useState(fullAppQuestionMapState);

  return (
    <>
      {AppPages.map((pageContent) => {
        if (Object.keys(pageContent.defaultQuestionConfig).length === 0) {
          return null;
        }
        return (
          <ControlPanelSection
            title={`Questions: ${pageContent.title}`}
            key={`Questions: ${pageContent.title}`}
            onChange={(state: boolean) => {
              if (state) {
                openQuestionsSettingPanel.set(pageContent.key);
              } else {
                // openQuestionsSettingPanel.set(undefined);
              }
            }}
          >
            <PageForm
              pageContent={pageContent as any}
              key={pageContent.title}
            />
          </ControlPanelSection>
        );
      })}
      <div className="w-full justify-end content-end flex mt-3">
        <button
          type="button"
          className="btn"
          onClick={() => fullAppQuestionMap.set(defaultQuestionMap)}
        >
          Reset all questions to defaults
        </button>
      </div>
    </>
  );
}
