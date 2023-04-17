import "./App.css";
import { useEffect, useState } from "react";
import Test from "./Test";

const QUOTE_API_URL = "https://type.fit/api/quotes";
const WORDS_API_URL = "https://random-word-api.herokuapp.com/word?number=15";

function App() {
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
    fetch(WORDS_API_URL)
      .then((data) => data.json())
      .then((json) => {
        setText(json.join(" "));
      });
  }

  const testProps = {
    text,
    tries,
  };

  return (
    <div className="App">
      <button
        id="reset-button"
        onClick={() => {
          setTries((prev) => prev + 1);
          getQuote();
        }}
      >
        +
      </button>
      <Test {...testProps} />
    </div>
  );
}

export default App;