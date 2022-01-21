import React from "react";

import { useNavigate } from "react-router-dom";
// import { printconfig } from "./bookConfig";
// import { Book } from "./Book";
import { BasicBorder, BasicButton } from "./book-components/BorderBox";
import { Footer } from "./components/Footer";
import PagePreview from "./components/PagePreview";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="py-10 flex w-screen h-screen justify-center align-middle">
      <div
        className="container-lg"
        style={{
          boxSizing: "border-box",
        }}
      >
        <BasicBorder>
          <div className="flex flex-row h-full w-full p-4 min-w-[800px] max-w-5xl">
            <div className="flex-grow flex flex-col p-10">
              <div className="text-6xl pb-6 leading-snug">
                dailyjournal.party
              </div>
              <div className="text-4xl leading-normal	">
                This is a tool for making customizable <i>printable</i> daily
                gratitude journals.
              </div>
              <div className="pt-20 text-4xl leading-normal flex-grow justify-end flex align-bottom justify-items-end">
                <div>
                  <BasicButton
                    onClick={() => navigate("/make")}
                    className="p-6"
                  >
                    Make one!
                  </BasicButton>
                </div>
              </div>
            </div>
            <PagePreview />
          </div>
        </BasicBorder>
        <Footer />
      </div>
    </div>
  );
}
