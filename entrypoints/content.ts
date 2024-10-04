import { CUSTOM_TAG_NAME } from "@/constant";

export default defineContentScript({
  matches: ["https://kimi.moonshot.cn/*"],
  runAt: "document_end",
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      tag: CUSTOM_TAG_NAME,
      position: "inline",
      onMount(root) {
        const script = document.createElement("script");
        script.src = browser.runtime.getURL("/ui.js");
        root.appendChild(script);
        script.onload = () => {
          script.remove();
        };
        root.tabIndex = -1;
      },
    });

    ui.mount();
  },
});
