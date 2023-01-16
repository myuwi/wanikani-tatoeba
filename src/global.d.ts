import { WKItemInfo } from "./types/wkItemInfo";

declare global {
  interface Window {
    wkItemInfo: WKItemInfo;
  }
}

export {};
