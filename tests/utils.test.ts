import { Parsed } from "../src/types";
import { parseFurigana, sentenceContainsVocab } from "../src/utils";

describe("parse furigana", () => {
  const tests: {
    name: string;
    input: string;
    output: Parsed;
  }[] = [
    {
      name: "sentence with simple kanji",
      input: "[羊|ひつじ]は[草|くさ]を[食|た]べる。",
      output: [
        ["羊", "ひつじ"],
        "は",
        ["草", "くさ"],
        "を",
        ["食", "た"],
        "べる。",
      ],
    },
    {
      name: "sentence with gikun word",
      input: "[今日|きょう]は[暑|あつ]い。",
      output: [["今日", "きょう"], "は", ["暑", "あつ"], "い。"],
    },
    {
      name: "sentence with jukugo word",
      input: "[牛乳|ぎゅう|にゅう]は[買|か]ったの？",
      output: [["牛乳", "ぎゅう", "にゅう"], "は", ["買", "か"], "ったの？"],
    },
  ];

  tests.forEach((test) => {
    it(`should parse furigana: ${test.name}`, () => {
      const result = parseFurigana(test.input);
      expect(result).toStrictEqual(test.output);
    });
  });
});

describe("check reading", () => {
  const tests = [
    {
      name: "basic kanji",
      sentence: "[羊|ひつじ]は[草|くさ]を[食|た]べる。",
      vocab: {
        characters: "草",
        readings: ["くさ"],
      },
      expect: true,
    },
    {
      name: "jukugo word",
      sentence: "[牛乳|ぎゅう|にゅう]は[買|か]ったの？",
      vocab: {
        characters: "牛乳",
        readings: ["ぎゅうにゅう"],
      },
      expect: true,
    },
    {
      name: "word with hiragana",
      sentence: "それ[買|か]うよ。",
      vocab: {
        characters: "買う",
        readings: ["かう"],
      },
      expect: true,
    },

    {
      name: "word starting with hiragana",
      sentence: "お[茶|ちゃ]は[好|す]きですか？",
      vocab: {
        characters: "お茶",
        readings: ["おちゃ"],
      },
      expect: true,
    },
  ];

  tests.forEach((test) => {
    it(`should detect reading: ${test.name}`, () => {
      const parsed = parseFurigana(test.sentence);
      const result = sentenceContainsVocab(parsed, test.vocab);

      expect(result).toBe(test.expect);
    });
  });
});
