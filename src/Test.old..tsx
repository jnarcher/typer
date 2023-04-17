import "./Test.css";
import { useEffect, useState } from "react";


type ValidText = {
  text: string;
  author: string | null;
};

export default function Test() {
  const [testText, setTestText] = useState<ValidText>({
    text: "Loading...",
    author: "Loading...",
  });
  const [playerText, setPlayerText] = useState("");
  // const [timerStart, setTimerStart] = useState(-1);

  // const date = new Date();

  function handleNewQuote() {
    fetch(QUOTE_API_URL)
      .then((data) => data.json())
      .then((json) => {
        let x = Math.floor(Math.random() * json.length);
        let text: ValidText = json[`${x}`];
        document.getElementById("player-textbox")?.focus();
        setPlayerText("");

        let author: string | null = text.author;
        console.log(author);

        if (author === null) author = "Unknown";

        setTestText({
          text: text.text,
          author: author,
        });
      });
  }

  function handlePlayerInput(e: React.ChangeEvent<HTMLInputElement>) {
    // startTimer();
    setPlayerText(e.target.value);
  }

  // Generate text separated by if it matches playerInput
  function colorizeText() {
    type ValidText = {
      text: string;
      id: string;
    };

    const sections: ValidText[] = [];
    let currString = "";
    let isCorrect = true;

    for (var i = 0; i < playerText.length; ++i) {
      if (playerText[i] === testText.text[i]) {
        if (!isCorrect) {
          sections.push({ text: currString, id: "incorrect-text" });
          currString = "";
        }
        isCorrect = true;
        currString += playerText[i];
      } else {
        if (isCorrect) {
          sections.push({ text: currString, id: "correct-text" });
          currString = "";
        }
        isCorrect = false;
        if (playerText[i] === " ") {
          sections.push({ text: currString, id: "incorrect-text" });
          sections.push({ text: "&nbsp;", id: "space-text" });
          currString = "";
        } else {
          currString += playerText[i];
        }
      }
    }

    isCorrect
      ? sections.push({ text: currString, id: "correct-text" })
      : sections.push({ text: currString, id: "incorrect-text" });

    sections.push({ text: testText.text.slice(i), id: "unwritten-text" });

    return sections.map((entry, j) => {
      if (entry.text === "&nbsp;") {
        return (
          <span key={j} className={entry.id}>
            &nbsp;
          </span>
        );
      }
      return (
        <span key={j} className={entry.id}>
          {entry.text}
        </span>
      );
    });
  }

  // function getSeconds() {
  //   let minutes = date.getMinutes();
  //   let seconds = date.getSeconds();
  //   return seconds + 60 * minutes;
  // }

  // function startTimer() {
  //   if (timerStart !== -1) return;

  //   setTimerStart(getSeconds());
  // }

  // calculate the position of the cursor
  let cursorPosLeft = 10.0 * playerText.length - 5;

  // let score = 0;
  // if (playerText.length === testText.text.length) {
  //   handleNewQuote();
  //   score = testText.text.length / 5 / ((getSeconds() - timerStart) / 60);
  //   document.getElementById("next-quote-button")?.focus();
  // }

  return (
    <>
      <button id="next-quote-button" onClick={handleNewQuote}>
        +
      </button>
      <div
        className="test"
        onClick={() => document.getElementById("player-textbox")?.focus()}
      >
        <input
          type="text"
          id={`player-textbox`}
          className="player-textbox"
          value={playerText}
          onChange={handlePlayerInput}
        />
        <div
          id="TEXT"
          onClick={() => document.getElementById("player-textbox")?.focus()}
        >
          {document.getElementById(`player-textbox`) ===
            document.activeElement && (
            <span
              id="cursor"
              className={playerText.length ? "" : "blink"}
              style={{ left: cursorPosLeft + "px" }}
            >
              |
            </span>
          )}
          {colorizeText()}
        </div>
        <p id="author">{testText.author}</p>
        {/* {Math.round(score) !== 0 && <p id="score">{Math.round(score)} WPM</p>} */}
      </div>
    </>
  );
}
