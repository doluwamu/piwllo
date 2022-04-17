export const firstLetterToUpperCase = (word) => {
  if (!word || typeof word !== "string") return;

  const wordArray = word.split("");
  const firstLetter = wordArray[0];
  return firstLetter.toUpperCase() + wordArray.splice(1).join("");
};

export const wordBreak = (word, len = 50) => {
  if (!word || typeof word !== "string") return;

  if (word.length < parseInt(len) || typeof len !== "number") return word;

  if (word.length >= parseInt(len)) {
    const wordArray = word.split("");
    return `${wordArray.splice(0, parseInt(len)).join("")}...`;
  }
};

export const firstLetterOfEachWordToUpperCase = (word) => {
  if (!word || typeof word !== "string") return;

  const wordArray = word.split(" ");
  let lettersArr = [];
  wordArray.map((w) => {
    let eachWord = w[0];
    if (eachWord !== undefined && typeof eachWord === "string") {
      eachWord = eachWord.toUpperCase();
    }
    return lettersArr.push(eachWord);
  });
  return lettersArr.join("");
};
