import { tatoeba } from "./tatoeba";
import { Sentence, Vocab } from "./types";
import { TatoebaResponse } from "./types/tatoeba";
import { NotifyItem, Page } from "./types/wkItemInfo";
import { parseFurigana, sentenceContainsVocab } from "./utils";

const onNotify = async (item: NotifyItem) => {
  const parentEl = document.createElement("div");
  parentEl.setAttribute("id", "tatoeba-context-sentences");

  const bodyElement = document.createElement("div");
  bodyElement.innerText = "Loading sentences...";
  parentEl.append(bodyElement);

  if (item.injector) {
    item.injector.appendSubsection(
      "More Context Sentences from Tatoeba.org",
      parentEl
    );
  }

  if (!item.characters) {
    bodyElement.innerText = "Item type unsupported.";
    return;
  }

  try {
    const data = await tatoeba(item.characters);
    const sentences = getSentences(data, item);
    appendSentences(parentEl, sentences, item.on);
  } catch (err) {
    console.error(err);
    bodyElement.innerText = "There was an error fetching sentences.";
  }
};

const getSentences = (data: TatoebaResponse, item: NotifyItem) => {
  if (!item?.characters || !item.reading) return [];

  const vocab: Vocab = {
    characters: item.characters,
    readings: item.reading,
  };

  const sentences = data.results.map((result) => {
    const japanese = result.text;
    const english = result.translations.find((e) => e.length > 0)?.[0]
      .text as string;

    const transcription = result.transcriptions?.[0]?.text;

    // Undefined if the item doesn't contain a transcription
    let relevant: boolean | undefined;
    if (transcription) {
      const parsedSentence = parseFurigana(transcription);
      relevant = sentenceContainsVocab(parsedSentence, vocab);
    }

    return {
      relevant,
      english,
      japanese,
    };
  });

  const relevantSentences = sentences.filter(
    (sentence) => sentence.relevant !== false
  );

  return relevantSentences;
};

const appendSentences = (
  element: HTMLElement,
  sentences: Sentence[],
  currentPage: Page
) => {
  const parentEl = document.createElement("div");

  const sentenceElement = sentences.map((sentence) => {
    const { english, japanese } = sentence;

    const wrapperEl = document.createElement("div");
    if (currentPage === "itemPage") {
      wrapperEl.classList.add(
        "subject-section__text",
        "subject-section__text--grouped"
      );
    } else {
      wrapperEl.classList.add("context-sentence-group");
    }

    const ja = document.createElement("p");
    ja.setAttribute("lang", "ja");
    ja.textContent = japanese;
    const en = document.createElement("p");
    en.textContent = english;

    wrapperEl.append(ja, en);

    return wrapperEl;
  });

  parentEl.append(...sentenceElement);

  if (element) {
    element.outerHTML = parentEl.innerHTML;
  }
};

// TODO: Add caching for Tatoeba data
unsafeWindow.wkItemInfo
  .forType("vocabulary")
  .under("examples")
  .notify(onNotify);
