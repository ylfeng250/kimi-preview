import { KIMI_PREVIEW_BTN } from "@/constant";
import { createRoot } from "react-dom/client";
import PreviewBtn from "../components/PreviewBtn";

export function addPreviewBtn() {
  const htmlLanguagelEments: NodeListOf<HTMLElement> =
    document.querySelectorAll("pre.language-html");
  const xmlLanguageElements: NodeListOf<HTMLElement> =
    document.querySelectorAll("pre.language-xml");
  const svgLanguageElements: NodeListOf<HTMLElement> =
    document.querySelectorAll("pre.language-svg");
  const elements = [
    ...htmlLanguagelEments,
    ...xmlLanguageElements,
    ...svgLanguageElements,
  ];
  elements.forEach((element) => {
    if (element.querySelector(`.${KIMI_PREVIEW_BTN}`)) {
      return;
    }

    // 查找兄弟节点中的 header 节点
    let sibling = element?.parentElement?.previousElementSibling;

    while (sibling) {
      if (sibling.tagName.toLowerCase() === "header") {
        console.log("找到 header 节点:", sibling);
        break;
      }
      sibling = sibling.previousElementSibling;
    }

    if (!sibling) {
      sibling = element?.parentElement?.nextElementSibling;
      while (sibling) {
        if (sibling.tagName.toLowerCase() === "header") {
          console.log("找到 header 节点:", sibling);
          break;
        }
        sibling = sibling.nextElementSibling;
      }
    }

    if (!sibling) {
      console.log("未找到 header 节点");
    } else {
      (sibling as HTMLHeadElement).style.position = "relative";
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.right = "50px";
      div.style.top = "6px";

      sibling.appendChild(div);

      const root = createRoot(div);
      root.render(<PreviewBtn preDom={element} />);
    }
  });
}
