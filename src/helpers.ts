export function getScore(
  userText: string,
  testText: string,
  timeInSeconds: number
) {
  let rawWPM = 0;
  let accuracy = 0;
  let adjustedWPM = 0;

  rawWPM = userText.length / 5 / (timeInSeconds / 60);

  let userWords = userText.split(" ");
  let testWords = testText.split(" ");
  let correctCharacterCount = 0;

  for (let i = 0; i < testWords.length; i++) {
    let testWord = testWords[i];
    let userWord = userWords[i];
    for (let j = 0; j < testWord.length; j++) {
      if (testWord[j] === userWord[j]) {
        correctCharacterCount++;
      } else {
        break;
      }
    }
    correctCharacterCount++; // account for spaces
  }
  correctCharacterCount--; // takes out the last spece

  accuracy = correctCharacterCount / userText.length;
  adjustedWPM = rawWPM * accuracy;

  rawWPM = Math.round(rawWPM * 10) / 10;
  adjustedWPM = Math.round(adjustedWPM);
  accuracy = Math.round(accuracy * 100);

  return { adjustedWPM, rawWPM, accuracy };
}
