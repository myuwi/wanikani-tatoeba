const fallback = () => {
  const code = GM_getValue<unknown>("cached-script", null);
  if (typeof code === "string") {
    eval(code);
  }
};

GM_xmlhttpRequest({
  method: "GET",
  url: "http://localhost:4106/index.js",
  onload: (res) => {
    const code = res.responseText;
    GM_setValue("cached-script", code);
    eval(code);
  },
  onabort: fallback,
  onerror: fallback,
  ontimeout: fallback,
});

export {};
