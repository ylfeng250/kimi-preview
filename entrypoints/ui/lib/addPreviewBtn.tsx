import { KIMI_PREVIEW_BTN } from "@/constant";
import { createRoot } from "react-dom/client";
import PreviewBtn from "../components/PreviewBtn";

export function addPreviewBtn() {
  const htmlLanguagelEments: NodeListOf<HTMLElement> =
    document.querySelectorAll("pre.language-html");
  const xmlLanguageElements: NodeListOf<HTMLElement> =
    document.querySelectorAll("pre.language-xml");
  const elements = [...htmlLanguagelEments, ...xmlLanguageElements];
  elements.forEach((element) => {
    if (element.querySelector(`.${KIMI_PREVIEW_BTN}`)) {
      return;
    }

    element.style.position = "relative";

    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.right = "5px";
    div.style.top = "5px";

    element.appendChild(div);

    const root = createRoot(div);
    root.render(<PreviewBtn preDom={element} />);
  });
}
