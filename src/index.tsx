/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Bindery from "bindery";
import ReactDOMServer from "react-dom/server";
import { Book } from "./Book";
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(<Book />, document.getElementById("content"));

const markup = ReactDOMServer.renderToStaticMarkup(<Book />);

const el = document.getElementById("content") as HTMLDivElement;
if (el) {
  el.innerHTML = markup;
}

Bindery.makeBook({
  content: "#content",
  printSetup: {
    layout: Bindery.Layout.BOOKLET,
    paper: Bindery.Paper.LETTER_LANDSCAPE,
    marks: Bindery.Marks.NONE,
    bleed: "0pt",
  } as any,
  pageSetup: {
    size: { width: "5.5in", height: "8.5in" },
    // margin: { top: "12pt", inner: "12pt", outer: "16pt", bottom: "20pt" },
  },
  rules: [Bindery.FullBleedPage({ selector: ".page" })],
});

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
