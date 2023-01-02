export type Vocab = {
  characters: string;
  readings: string[];
};

export type Parsed = (string | string[])[];

export type Sentence = {
  relevant: boolean | undefined;
  english: string;
  japanese: string;
};
