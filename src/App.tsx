import "./App.css";
import { useEffect, useState } from "react";
import Test from "./Test";
import { wordList } from "./wordList";

function App() {
  const QUOTE_API_URL = "https://type.fit/api/quotes";
  const WORDS_API_URL = "https://random-word-api.herokuapp.com/word?number=100";

  const [text, setText] = useState<string>("");
  const [tries, setTries] = useState<number>(0);

  useEffect(getQuote, []);

  function getQuote() {
    fetch(QUOTE_API_URL)
      .then((data) => data.json())
      .then((json) => {
        let x = Math.floor(Math.random() * json.length);
        let text = json[`${x}`].text;
        setText(text);
      });
  }

  function getWords() {
    // fetch(WORDS_API_URL)
    //   .then((data) => data.json())
    //   .then((json) => {
    //     setText(json.join(" "));
    //   });
    let s = "";
    for (let i = 0; i < 100; ++i) {
      let x = Math.floor(Math.random() * wordList.length);
      s += wordList[x] + " ";
    }
    setText(s);
  }

  const testProps = {
    text,
    tries,
  };

  // TODO: Make color pallette selectable from options in "config/themes.json"

  return (
    <div className="App">
      <button
        id="new-words-button"
        className="reset-button"
        onClick={() => {
          setTries((prev) => prev + 1);
          getWords();
        }}
      >
        {" "}
        words{" "}
      </button>
      <button
        id="new-quote-button"
        className="reset-button"
        onClick={() => {
          setTries((prev) => prev + 1);
          getQuote();
        }}
      >
        quote
      </button>
      <div className="test-container">
        <Test {...testProps} />
      </div>
    </div>
  );
}

export default App;