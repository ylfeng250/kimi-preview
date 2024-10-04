import { addPreviewBtn } from "../lib/addPreviewBtn";

export default function Preview() {
  useEffect(() => {
    const targetNode = document.getElementById("scroll-list");
    const config = { childList: true, subtree: true };
    if (!targetNode) return;

    const callback = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (
              "matches" in node &&
              // @ts-ignore
              node.matches("pre")
            ) {
              setTimeout(() => {
                addPreviewBtn();
                console.log("handleScrollList");
              }, 500);
            }
          });
        }
      }
    };
    const observer = new MutationObserver(callback);

    if (targetNode) {
      addPreviewBtn();
      observer.observe(targetNode, config);
    }
    return () => observer.disconnect();
  }, []);
  return null;
}
