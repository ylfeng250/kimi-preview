import { createRoot } from "react-dom/client";
import waitFor from "p-wait-for";
import { CUSTOM_TAG_NAME } from "@/constant";
import Preview from "./components/preview";

function Test() {
  useEffect(() => {
    console.log("?????????????");
  }, []);
  return null;
}

export function getChatSegments() {
  return document.querySelector("#k-chat-segments") as HTMLElement;
}

export default defineUnlistedScript(async () => {
  await waitFor(() => getChatSegments() != null);
  const root = createRoot(document.querySelector(CUSTOM_TAG_NAME)!);
  root.render(<Preview />);
});
