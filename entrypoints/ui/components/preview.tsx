import { Button, Switch } from "antd";
import { addPreviewBtn } from "../lib/addPreviewBtn";

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
          }, 500);
        }
      });
    }
  }
};
export default function Preview() {
  const observerRef = useRef(new MutationObserver(callback));
  function init() {
    const targetNode = document.getElementById("scroll-list");
    const config = { childList: true, subtree: true };
    if (!targetNode) return () => {};

    if (targetNode) {
      addPreviewBtn();
      observerRef.current.observe(targetNode, config);
    }
    return () => observerRef.current.disconnect();
  }
  useEffect(() => {
    const clean = init();
    return () => clean();
  }, []);
  return (
    <Button
      type="primary"
      size="small"
      style={{
        position: "fixed",
        zIndex: 200,
        right: "50px",
        top: "16px",
      }}
      onClick={() => {
        init();
      }}
    >
      触发预览
    </Button>
  );
}
