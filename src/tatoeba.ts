import { TatoebaResponse } from "./types/tatoeba";

export const tatoeba = async (word: string): Promise<TatoebaResponse> => {
  const url = `https://tatoeba.org/en/api_v0/search?from=jpn&to=eng&trans_to=eng&trans_link=direct&query=${word}`;

  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: (res) => {
        try {
          const data: TatoebaResponse = JSON.parse(res.responseText);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      },
      onabort: reject,
      onerror: reject,
      ontimeout: reject,
    });
  });
};
