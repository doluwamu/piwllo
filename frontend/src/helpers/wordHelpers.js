export const firstLetterToUpperCase = (word) => {
  if (!word || typeof word !== "string") return;

  const wordArray = word.split("");
  const firstLetter = wordArray[0];
  return firstLetter.toUpperCase() + wordArray.splice(1).join("");
};

export const wordBreak = (word, len = 50) => {
  if (!word || typeof word !== "string") return;

  if (word.length < parseInt(len)) return word;

  if (word.length >= parseInt(len)) {
    const wordArray = word.split("");
    return `${wordArray.splice(0, parseInt(len)).join("")}...`;
  }
};
