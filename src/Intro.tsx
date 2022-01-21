/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { useNavigate } from "react-router-dom";
import useMobileDetect from "use-mobile-detect-hook";
import { useWindowWidth, useWindowHeight } from "@react-hook/window-size";
import { useState } from "@hookstate/core";

// import { printconfig } from "./bookConfig";
// import { Book } from "./Book";
import { BasicBorder, BasicButton } from "./book-components/BorderBox";
import { Footer } from "./components/Footer";
import PagePreview from "./components/PagePreview";
import DailyPlan from "./pages/DailyPlan";
import DailyReflect from "./pages/DailyReflect";
import { printConfig } from "./bookConfig";
import { convertUnits } from "./utils/convert";

function LeftPanel() {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex flex-col px-10 sm:p-10">
      <div className="text-4xl md:text-5xl lg:text-6xl pb-6 leading-snug pt-6 sm:pt-0">
        <span>dailyjournal.</span>
        <br />
        <span>party</span>
      </div>
      <div className="text-lg md:text-2xl lg:text-4xl leading-normal	">
        This is a tool for making customizable <i>printable</i> daily gratitude
        journals.
      </div>
      <div className="pt-10 sm:pt-20 text-lg md:text-2xl lg:text-4xl leading-normal flex-grow justify-end flex align-bottom justify-items-end">
        <div>
          <BasicButton onClick={() => navigate("/make")} className="p-4 sm:p-6">
            Make one!
          </BasicButton>
        </div>
      </div>
    </div>
  );
}

function RightPanel() {
  const detectMobile = useMobileDetect();
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();

  const printConfigState = useState(printConfig);
  const printConfigValue = printConfigState.get();

  const widthInPx = convertUnits(
    printConfigValue.pageWidth,
    printConfigValue.pageUnits,
    "px"
  );

  const heightInPx = convertUnits(
    printConfigValue.pageHeight,
    printConfigValue.pageUnits,
    "px"
  );

  const twoPage = detectMobile.isMobile() || windowWidth < 768;

  const yZoom =
    windowWidth < 1024 ? Math.min((windowWidth * 0.5) / widthInPx, 0.65) : 0.65;

  return (
    <div className="flex justify-center flex-grow pb-8 sm:p-4">
      <PagePreview
        zoom={twoPage ? (windowWidth * 0.8) / widthInPx : yZoom}
        pageContent={DailyPlan}
      />
      {twoPage && (
        <PagePreview
          zoom={(windowWidth * 0.8) / widthInPx}
          pageContent={DailyReflect}
        />
      )}
    </div>
  );
}

export default function Intro() {
  return (
    <div className="py-0 sm:py-10 flex w-screen h-screen justify-center align-middle">
      <div
        className="w-full h-full sm:w-11/12 sm:max-w-[1000px] flex flex-col"
        style={{
          boxSizing: "border-box",
        }}
      >
        <BasicBorder className="flex flex-col-reverse h-full md:h-auto md:flex-row  ">
          <LeftPanel />
          <RightPanel />
        </BasicBorder>
        <Footer />
      </div>
    </div>
  );
}
