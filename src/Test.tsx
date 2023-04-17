import { useEffect, useState } from "react";
import "./Test.css";

type TestProps = {
  text: string;
  tries: number;
};

type WordProps = {
  error: string;
  letters: string[];
  extras: string;
};

function Test(props: TestProps) {
  const words = props.text.split(" ");

  useEffect(() => setUserInput(""), [props.tries]);

  const [userInput, setUserInput] = useState<string>("");
  const [testFocus, setTestFocus] = useState<boolean>(false);

  function classifyWordsAndLetters() {
    const classifier: WordProps[] = [];
    const classifierLetters: string[][] = [];
    const userWords = userInput.split(" ");

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

    return classifier;
  }

  const classifier = classifyWordsAndLetters();

  const activeWordIdx = userInput.split(" ").length - 1;
  const activeWord = document
    .getElementById("words")
    ?.children.item(activeWordIdx) as HTMLElement;

  const [activeWordLeft, activeWordTop] = activeWord
    ? [activeWord.offsetLeft, activeWord.offsetTop]
    : [0, 0];

  let numCharsIntoWord =
    userInput.length > 0 ? userInput.split(" ")[activeWordIdx].length : 0;

  let [caretLeft, caretTop] = [
    activeWordLeft - 6 + numCharsIntoWord * 13.3,
    activeWordTop - 4,
  ];

  return (
    <>
      <input
        id="input-box"
        onChange={(e) => setUserInput(e.target.value)}
        onFocus={() => setTestFocus(true)}
        onBlur={() => setTestFocus(false)}
        value={userInput}
      />
      {testFocus && (
        <div
          id="caret"
          className={userInput.length === 0 ? "blink" : ""}
          style={{ left: caretLeft + "px", top: caretTop + "px" }}
        >
          |
        </div>
      )}
      <div
        className="Test"
        onClick={() => document.getElementById("input-box")?.focus()}
      >
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
                <span key={-wordIdx} className="letter incorrect extras">
                  {classifier[wordIdx].extras}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Test;
