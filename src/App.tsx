import './App.css'
import { useState } from 'react';

const START_TEXT = "Anyone who has never made a mistake has never tried anything new.";

const QUOTE_API_URL = "https://type.fit/api/quotes"

export default function App() {

  const [testText,   setTestText]   = useState(START_TEXT);
  const [playerText, setPlayerText] = useState("");

  function handlePlayerInput(e: React.ChangeEvent<HTMLInputElement>) {
    setPlayerText(e.target.value);
  }

  function handleNewQuote() {
    fetch(QUOTE_API_URL)
      .then(data => data.json())
      .then(json => {
        let x = Math.floor(Math.random() * json.length);
        let text = json[`${x}`].text;
        document.getElementById("player-textbox")?.focus();
        setPlayerText("");
        setTestText(text);
      })

  }

  let styles = testText.includes(playerText) ? "" : "wrong";

  return <div className="App">
    <button className="next-quote-button" onClick={handleNewQuote}>
      <img src="./src/assets/refresh.svg" alt="refresh.svg" />
    </button>
    <h1 className={styles}>{testText}</h1>
    <input type="text" id="player-textbox" value={playerText} onChange={handlePlayerInput} />
    {playerText === testText && "Passed."}
  </div>
}