import { Simplify } from "type-fest";

export type Page =
  | "lesson"
  | "lessonQuiz"
  | "review"
  | "extraStudy"
  | "itemPage";
export type ItemType = "radical" | "kanji" | "vocabulary";
export type Section = "composition" | "meaning" | "reading" | "examples";
export type Spoils = Section | "nothing";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Permutations<T extends string, U extends string = T> = T extends any
  ? T | `${T},${Permutations<Exclude<U, T>>}`
  : never;

export type Pages = Permutations<Page>;
export type ItemTypes = Permutations<ItemType>;
export type Sections = Permutations<Section>;

export type Composition = {
  characters: string;
  meaning: string[];
};

export type Item = {
  on: Page;
  type: ItemType;
  under: Section;
  hiddenSpoiler: Section;
  id: number;
  meaning: string[];
  characters?: string;
  reading?: string[];
  composition?: Composition[];
  partOfSpeech: string;
  onyomi: string[];
  kunyomi: string[];
  nanori: string[];
  emphasis: string;
};

export type NotifyItem = Simplify<
  Item & {
    injector: any;
  }
>;

// TODO: https://greasyfork.org/en/scripts/430565-wanikani-item-info-injector/code
export type WKItemInfo = {
  on: (...pages: Pages[]) => any;
  forType: (...types: ItemTypes[]) => any;
  under: (...tabs: Sections[]) => any;
  spoiling: (...spoilers: (Sections | "nothing")[]) => any;
  version: string;
};
