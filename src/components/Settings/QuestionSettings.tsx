/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { ControlPanelSection } from "./ControlPanelSection";
import { PageForm } from "./BookForm";
import { AppPages } from "../../bookConfig";
import { openQuestionsSettingPanel } from "../../state/openQuestionsSettingPanel";

export function QuestionSettings() {
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
            ;
          </ControlPanelSection>
        );
      })}
    </>
  );
}
