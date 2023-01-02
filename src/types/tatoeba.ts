// Generated from API response using https://app.quicktype.io/

export interface TatoebaResponse {
  paging: Paging;
  results: Result[];
}

export interface Paging {
  Sentences: Sentences;
}

export interface Sentences {
  finder: string;
  page: number;
  current: number;
  count: number;
  perPage: number;
  start: number;
  end: number;
  prevPage: boolean;
  nextPage: boolean;
  pageCount: number;
  sort: null;
  direction: null;
  limit: null;
  sortDefault: boolean;
  directionDefault: boolean;
  scope: null;
  completeSort: any[];
}

export interface Result {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script: null;
  license: string;
  translations: Array<Translation[]>;
  transcriptions: Transcription[];
  audios: any[];
  user: User;
  lang_name: string;
  dir: string;
  lang_tag: string;
  is_favorite: null;
  is_owned_by_current_user: boolean;
  permissions: null;
  max_visible_translations: number;
  current_user_review: null;
}

export interface Transcription {
  id: number;
  sentence_id: number;
  script: string;
  text: string;
  user_id: number | null;
  needsReview: boolean;
  modified: Date;
  user: User | null;
  readonly: boolean;
  type: string;
  html: string;
  markup: null;
  info_message: string;
}

export interface User {
  username: string;
}

export interface Translation {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script: null | string;
  transcriptions: Transcription[];
  audios: Audio[];
  isDirect?: boolean;
  lang_name: string;
  dir: string;
  lang_tag: string;
}

export interface Audio {
  id: number;
  author: string;
  attribution_url: string;
  license: null;
  external?: null;
  sentence_id?: number;
  user?: User;
}
