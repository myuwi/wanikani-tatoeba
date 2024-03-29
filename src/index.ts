import { Sentence, Vocab } from "./types";
import { TatoebaResponse } from "./types/tatoeba";
import { NotifyItem } from "./types/wkItemInfo";
import { LRUCache } from "./cache";
import { tatoeba } from "./tatoeba";
import { parseFurigana, sentenceContainsVocab } from "./parser";

const cache = new LRUCache<Sentence[]>(10);

const onNotify = async (item: NotifyItem) => {
  const bodyElement = document.createElement("p");
  bodyElement.classList.add("subject-section__text");
  bodyElement.innerText = "Loading sentences...";

  if (item.injector) {
    item.injector.appendSubsection(
      "Context Sentences from Tatoeba.org",
      bodyElement
    );
  }

  if (!item.characters) {
    bodyElement.innerText = "Item type unsupported.";
    return;
  }

  try {
    let sentences = cache.get(item.characters);

    if (!sentences) {
      const data = await tatoeba(item.characters);
      sentences = getSentences(data, item);
      cache.put(item.characters, sentences);
    }

    if (!sentences.length) {
      bodyElement.innerText =
        "No relevant context sentences for the current vocabulary were found.";
      return;
    }

    appendSentences(bodyElement, sentences);
  } catch (err) {
    console.error(err);
    bodyElement.innerText = "There was an error fetching sentences.";
  }
};

const getSentences = (data: TatoebaResponse, item: NotifyItem): Sentence[] => {
  if (!item.characters || !item.reading) return [];

  const vocab: Vocab = {
    characters: item.characters,
    readings: item.reading,
  };

  const sentences = data.results.reduce<Sentence[]>((sentences, result) => {
    const japanese = result.text;
    const directTranslations = result.translations[0];
    // const indirectTranslations = result.translations[1];
    // const translations = directTranslations;
    const english = directTranslations[0]?.text;

    if (english) {
      const transcription = result.transcriptions[0];

      // Undefined if the item doesn't contain a transcription
      let relevant: boolean | undefined;
      if (transcription) {
        const parsedSentence = parseFurigana(transcription.text);
        relevant = sentenceContainsVocab(parsedSentence, vocab);
      }

      sentences.push({
        relevant,
        english,
        japanese,
      });
    }

    return sentences;
  }, []);

  const relevantSentences = sentences.filter(
    (sentence) => sentence.relevant !== false
  );

  return relevantSentences;
};

const createSentenceElement = (sentence: Sentence) => {
  const wrapperEl = document.createElement("div");
  wrapperEl.classList.add(
    "subject-section__text",
    "subject-section__text--grouped"
  );

  const ja = document.createElement("p");
  ja.setAttribute("lang", "ja");
  ja.textContent = sentence.japanese;

  const en = document.createElement("p");
  en.textContent = sentence.english;

  wrapperEl.append(ja, en);

  return wrapperEl;
};

const appendSentences = (element: HTMLElement, sentences: Sentence[]) => {
  const parentEl = document.createElement("div");
  parentEl.style.display = "contents";

  const sentenceElements = sentences.map((sentence) =>
    createSentenceElement(sentence)
  );

  parentEl.append(...sentenceElements);

  if (element) {
    const container = element.parentNode;
    container?.replaceChild(parentEl, element);
  }
};

unsafeWindow.wkItemInfo
  .forType("vocabulary")
  .under("examples")
  .notify(onNotify);
