import { ChangeEvent, useEffect, useState } from "react";
import { getScore } from "./helpers";
import "./Test.css";

type TestProps = {
  text: string;
  type: string; // "words" OR "time"
  time: number;
  wordCount: number;
};

type WordProps = {
  error: string;
  letters: string[];
  extras: string;
};

type Timer = {
  start: Date | null;
  end: Date | null;
  state: string; // "idle" -> "running" -> "finished"
};

function Test(props: TestProps) {
  const [words, setWords] = useState<string[]>(props.text.split(" "));
  const [userInput, setUserInput] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>({
    start: null,
    end: null,
    state: "idle",
  });

  function handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    // prevents user from skipping words with spacebar
    if (
      userInput[userInput.length - 1] === " " &&
      value[value.length - 1] === " "
    ) {
      return;
    }

    // prevents space if on last word
    if (
      userInput.split(" ").length === words.length &&
      value[value.length - 1] === " "
    ) {
      return;
    }

    setUserInput(value);
  }

  useEffect(() => {
    setWords(props.text.split(" "));
    setUserInput("");
  }, [props.text]);

  //* CALCULATE CARET POSITION
  // TODO: find some way to not have to magic number these (generate them based on font size??)
  let activeWordIdx = userInput.split(" ").length - 1;
  let activeWord = document
    .getElementById("words")
    ?.children.item(activeWordIdx) as HTMLElement;

  let [activeWordLeft, activeWordTop] = activeWord
    ? [activeWord.offsetLeft, activeWord.offsetTop]
    : [0, 0];

  let numCharsIntoWord =
    userInput.length > 0 ? userInput.split(" ")[activeWordIdx].length : 0;

  let [caretLeft, caretTop] = [
    activeWordLeft - 1.2 + numCharsIntoWord * 11.9,
    activeWordTop,
  ];

  //* UPDATE TIMER STATE
  const userWords = userInput.split(" ");
  if (timer.state === "idle" && userInput !== "") {
    setTimer((prev) => ({
      ...prev,
      start: new Date(),
      state: "running",
    }));
  }

  if (
    timer.state === "running" &&
    userWords.length === words.length &&
    userWords[userWords.length - 1].length === words[words.length - 1].length
  ) {
    setTimer((prev) => ({
      ...prev,
      end: new Date(),
      state: "finished",
    }));
  }

  // on text change restart timer
  useEffect(
    () =>
      setTimer({
        start: null,
        end: null,
        state: "idle",
      }),
    [props.text]
  );

  //* CLASSIFY CHARACTERS BASED ON CORRECTNESS
  const classifier: WordProps[] = [];
  const classifierLetters: string[][] = [];

  for (let [wordIdx, word] of words.entries()) {
    let letterClasses = [];
    const userWord = userWords[wordIdx];

    if (userWord) {
      for (let [letterIdx, letter] of word.split("").entries()) {
        const userLetter = userWord[letterIdx];
        if (userWord && userLetter) {
          if (userLetter === letter) {
            letterClasses.push("correct");
          } else {
            letterClasses.push("incorrect");
          }
        } else {
          letterClasses.push("");
        }
      }
    } else {
      letterClasses = Array(word.length).fill("");
    }
    classifierLetters.push(letterClasses);
  }

  for (let [wordIdx, word] of words.entries()) {
    let wordProps: WordProps = {
      error: "",
      letters: classifierLetters[wordIdx],
      extras: "",
    };

    let userWord = userWords[wordIdx];

    if (classifierLetters[wordIdx].includes("incorrect")) {
      wordProps.error = "error";
    }
    if (userWord && userWord.length !== word.length) {
      wordProps.error = "error";

      if (userWord.length > word.length) {
        let start = userWord.length - (userWord.length - word.length);
        wordProps.extras = userWord.slice(start);
      }
    }

    classifier.push(wordProps);
  }

  //* CALCULATE SCORE
  let adjustedWPM, rawWPM, accuracy;
  if (timer.state === "finished" && timer.end && timer.start) {
    let result = getScore(
      userInput,
      words.join(" "),
      (timer.end.getTime() - timer.start.getTime()) / 1000
    );

    adjustedWPM = result.adjustedWPM;
    rawWPM = result.rawWPM;
    accuracy = result.accuracy;
  }

  return (
    <div
      className="Test"
      onClick={() => document.getElementById("input-box")?.focus()}
    >
      <div id="progression">{activeWordIdx + "/" + words.length}</div>
      <input
        id="input-box"
        onChange={handleUserInput}
        value={userInput}
        autoFocus
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {focus && (
        <div
          id="caret"
          className={userInput.length === 0 ? "blink " : "" + "caret-smooth"}
          style={{ left: caretLeft + "px", top: caretTop + "px" }}
        />
      )}
      <div id="words">
        {words.map((word, wordIdx) => (
          <div
            key={wordIdx}
            className={
              "word " +
              classifier[wordIdx].error +
              (wordIdx === userInput.split(" ").length - 1 ? " active" : "")
            }
          >
            {word.split("").map((letter, letterIdx) => (
              <span
                key={letterIdx}
                className={"letter " + classifier[wordIdx].letters[letterIdx]}
              >
                {letter}
              </span>
            ))}
            {classifier[wordIdx].extras !== "" && (
              <span key={-wordIdx} className="letter extras letter-dim">
                {classifier[wordIdx].extras}
              </span>
            )}
          </div>
        ))}
      </div>
      {timer.state === "finished" && (
        <div id="score">
          <span>WPM: {adjustedWPM}</span>
          <span>ACC: {accuracy}%</span>
          <span>RAW: {rawWPM}</span>
        </div>
      )}
    </div>
  );
}

export default Test;
