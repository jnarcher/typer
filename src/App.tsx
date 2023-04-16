import "./App.css";
import { ReactComponentElement, useEffect, useState } from "react";
import Test from "./Test";

const QUOTE_API_URL = "https://type.fit/api/quotes";

export default function App() {
  const [tests, setTests] = useState<JSX.Element[]>([]);

  // type ValidText = {
  //   text: string;
  //   author: string | null;
  // };

  // const [testText, setTestText] = useState<ValidText>({
  //   text: "lorem ipsum",
  //   author: "ur mom",
  // });
  // const [playerText, setPlayerText] = useState("");
  // const [timerStart, setTimerStart] = useState(-1);

  // const date = new Date();

  // function handlePlayerInput(e: React.ChangeEvent<HTMLInputElement>) {
  //   startTimer();
  //   setPlayerText(e.target.value);
  // }

  // // Generate text separated by if it matches playerInput
  // function colorizeText() {
  //   type ValidText = {
  //     text: string;
  //     id: string;
  //   };

  //   const sections: ValidText[] = [];
  //   let currString = "";
  //   let isCorrect = true;

  //   for (var i = 0; i < playerText.length; ++i) {
  //     if (playerText[i] === testText.text[i]) {
  //       if (!isCorrect) {
  //         sections.push({ text: currString, id: "incorrect-text" });
  //         currString = "";
  //       }
  //       isCorrect = true;
  //       currString += playerText[i];
  //     } else {
  //       if (isCorrect) {
  //         sections.push({ text: currString, id: "correct-text" });
  //         currString = "";
  //       }
  //       isCorrect = false;
  //       if (playerText[i] === " ") {
  //         sections.push({ text: currString, id: "incorrect-text" });
  //         sections.push({ text: "&nbsp;", id: "space-text" });
  //         currString = "";
  //       } else {
  //         currString += playerText[i];
  //       }
  //     }
  //   }

  //   isCorrect
  //     ? sections.push({ text: currString, id: "correct-text" })
  //     : sections.push({ text: currString, id: "incorrect-text" });

  //   sections.push({ text: testText.text.slice(i), id: "unwritten-text" });

  //   return sections.map((entry, j) => {
  //     if (entry.text === "&nbsp;") {
  //       return (
  //         <span key={j} className={entry.id}>
  //           &nbsp;
  //         </span>
  //       );
  //     }
  //     return (
  //       <span key={j} className={entry.id}>
  //         {entry.text}
  //       </span>
  //     );
  //   });
  // }

  // function handleNewQuote() {
  //   setTimerStart(-1);

  //   fetch(QUOTE_API_URL)
  //     .then((data) => data.json())
  //     .then((json) => {
  //       let x = Math.floor(Math.random() * json.length);
  //       let text: ValidText = json[`${x}`];
  //       document.getElementById("player-textbox")?.focus();
  //       setPlayerText("");

  //       let author: string | null = text.author;
  //       console.log(author);

  //       if (author === null) author = "Unknown";

  //       setTestText({
  //         text: text.text,
  //         author: author,
  //       });
  //     });
  // }

  // function getSeconds() {
  //   let minutes = date.getMinutes();
  //   let seconds = date.getSeconds();
  //   return seconds + 60 * minutes;
  // }

  // function startTimer() {
  //   if (timerStart !== -1) return;

  //   setTimerStart(getSeconds());
  // }

  // // calculate the position of the cursor
  // let cursorPosLeft = 10.0 * playerText.length - 5;

  // let score = 0;
  // if (playerText.length === testText.text.length) {
  //   // handleNewQuote();
  //   score = testText.text.length / 5 / ((getSeconds() - timerStart) / 60);
  //   document.getElementById("next-quote-button")?.focus();
  // }

  function handleClick() {
    setTests((prev) => [
      <Test
        style={{ top: prev.length * 150 + 10 + "px" }}
        index={prev.length + 1}
      />,
      ...prev,
    ]);
  }

  return (
    <>
      <div className="App">
        <button id="next-quote-button" onClick={handleClick}>
          +
        </button>
        {tests}
      </div>
    </>
  );
}
