import { WKItemInfo } from "./types/wkItemInfo";

declare global {
  interface Window {
    wkItemInfo: WKItemInfo;
  }
  const unsafeWindow: Window;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GM_xmlhttpRequest: any;
}

export {};
