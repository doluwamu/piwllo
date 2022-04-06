export const firstLetterToUpperCase = (word) => {
  if (!word || typeof word !== "string") return;

  const wordArray = word.split("");
  const firstLetter = wordArray[0];
  return firstLetter.toUpperCase() + wordArray.splice(1).join("");
};
