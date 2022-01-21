import React from "react";

import { useNavigate } from "react-router-dom";
import useMobileDetect from "use-mobile-detect-hook";

// import { printconfig } from "./bookConfig";
// import { Book } from "./Book";
import { BasicBorder, BasicButton } from "./book-components/BorderBox";
import { Footer } from "./components/Footer";
import PagePreview from "./components/PagePreview";
import DailyPlan from "./pages/DailyPlan";
import DailyReflect from "./pages/DailyReflect";

export default function Intro() {
  const detectMobile = useMobileDetect();
  const navigate = useNavigate();

  return (
    <div className="py-0 sm:py-10 flex w-screen h-screen justify-center align-middle">
      <div
        className="w-full h-full sm:container-lg flex flex-col"
        style={{
          boxSizing: "border-box",
        }}
      >
        <BasicBorder className="flex-grow ">
          <div className="flex flex-col-reverse sm:flex-row w-full p-4 min-w-full sm:min-w-[800px] sm:max-w-5xl">
            <div className="flex-grow flex flex-col p-10">
              <div className="text-4xl sm:text-6xl pb-6 leading-snug pt-6 sm:pt-0">
                dailyjournal.party
              </div>
              <div className="text-lg sm:text-4xl leading-normal	">
                This is a tool for making customizable <i>printable</i> daily
                gratitude journals.
              </div>
              <div className="pt-10 sm:pt-20 text-lg sm:text-4xl leading-normal flex-grow justify-end flex align-bottom justify-items-end">
                <div>
                  <BasicButton
                    onClick={() => navigate("/make")}
                    className="p-4 sm:p-6"
                  >
                    Make one!
                  </BasicButton>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <PagePreview
                zoom={detectMobile.isMobile() ? 0.3 : 0.65}
                pageContent={DailyPlan}
              />
              {detectMobile.isMobile() && (
                <PagePreview zoom={0.3} pageContent={DailyReflect} />
              )}
            </div>
          </div>
        </BasicBorder>
        <Footer />
      </div>
    </div>
  );
}
