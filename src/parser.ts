import { Parsed, Vocab } from "./types";

// This assumes sentences cannot contain [, ] and | characters
export const parseFurigana = (text: string): Parsed => {
  const parts = text.split(/\[|\]/).filter(Boolean);

  const results = parts.map((part) => {
    if (part.includes("|")) {
      return part.split("|");
    }
    return part;
  });

  return results;
};

export const sentenceContainsVocab = (
  parsedSentence: Parsed,
  vocab: Vocab
): boolean => {
  // Split strings in the sentence to single characters to make them easier to loop over
  // E.g. from [["食", "た"], "べる"]
  //      to   [["食", "た"], "べ", "る"]
  const sentence = parsedSentence.reduce<Parsed>((acc, cur) => {
    if (Array.isArray(cur)) {
      return [...acc, cur];
    }
    return [...acc, ...cur.split("")];
  }, []);

  let tempCharacters = "";
  let tempReading = "";

  for (const element of sentence) {
    if (Array.isArray(element)) {
      const [kanji, ...reading] = element;
      tempCharacters += kanji;
      tempReading += reading.join("");
    } else {
      tempCharacters += element;
      tempReading += element;
    }

    if (
      !vocab.characters.startsWith(tempCharacters) ||
      !vocab.readings.some((reading) => reading.startsWith(tempReading))
    ) {
      tempCharacters = "";
      tempReading = "";
    } else if (
      tempCharacters === vocab.characters &&
      vocab.readings.some((r) => r === tempReading)
    ) {
      return true;
    }
  }

  return false;
};
