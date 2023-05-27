import "./App.css";
import { useEffect, useState } from "react";
import Test from "./Test";
import { wordList } from "./wordList";



const DEFAULT_TEST_PROPERTIES = {
  text: "Loading...",
  type: "words",
  time: 30,
  wordCount: 25,
};

const WORDCOUNT_OPTIONS = [10, 25, 50, 100];
const TIME_OPTIONS = [15, 30, 60, 120];

function App() {
  // const QUOTE_API_URL = "https://type.fit/api/quotes";
  // const WORDS_API_URL = "https://random-word-api.herokuapp.com/word?number=100";

  const [testProps, setTestProps] = useState(DEFAULT_TEST_PROPERTIES);

  useEffect(
    () =>
      testProps.type === "words" ? getWords(testProps.wordCount) : getWords(50),
    [testProps.type, testProps.time, testProps.wordCount]
  );

  function getWords(numWords: number) {
    let text = "";
    for (let i = 0; i < numWords; ++i) {
      let x = Math.floor(Math.random() * wordList.length);
      text += wordList[x] + " ";
    }
    text = text.trim();
    setTestProps((prev) => ({
      ...prev,
      text,
    }));
  }

  function handleWordCountChange(wordCount: number) {
    if (wordCount === testProps.wordCount) {
      getWords(wordCount);
      return;
    }
    setTestProps((prev) => ({
      ...prev,
      wordCount,
    }));
  }

  function handleTimeChange(time: number) {
    if (time === testProps.time) {
      getWords(50);
    }
    setTestProps((prev) => ({
      ...prev,
      time,
    }));
  }

  function handleTestTypeChange(type: string) {
    return; // ! REMOVE (implementing just the words mode first)
    if (type === testProps.type) {
      getWords(testProps.type === "words" ? testProps.wordCount : 50);
    }
    setTestProps((prev) => ({
      ...prev,
      type,
    }));
  }

  // function getQuote() {
  //   fetch(QUOTE_API_URL)
  //     .then((data) => data.json())
  //     .then((json) => {
  //       let x = Math.floor(Math.random() * json.length);
  //       let text = json[`${x}`].text;
  //       setText(text);
  //     });
  // }

  return (
    <div className="App">
      <div className="settings">
        {/*<div
          className={testProps.type === "time" ? "selected" : ""}
          onClick={() => handleTestTypeChange("time")}
        >
          time
        </div>*/}
        <div
          className={testProps.type === "words" ? "selected" : ""}
          onClick={() => handleTestTypeChange("words")}
        >
          words
        </div>
        |
        {testProps.type === "words"
          ? WORDCOUNT_OPTIONS.map((count, i) =>
              count === testProps.wordCount ? (
                <div
                  key={i}
                  className="selected"
                  onClick={() => handleWordCountChange(count)}
                >
                  {count}
                </div>
              ) : (
                <div key={i} onClick={() => handleWordCountChange(count)}>
                  {count}
                </div>
              )
            )
          : TIME_OPTIONS.map((count, i) =>
              count === testProps.time ? (
                <div
                  key={i}
                  className="selected"
                  onClick={() => handleTimeChange(count)}
                >
                  {count}
                </div>
              ) : (
                <div key={i} onClick={() => handleTimeChange(count)}>
                  {count}
                </div>
              )
            )}
      </div>
      <div className="test-container">
        <Test {...testProps} />
      </div>
    </div>
  );
}

export default App;
