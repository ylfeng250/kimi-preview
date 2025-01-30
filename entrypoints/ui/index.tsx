import { createRoot } from "react-dom/client";
import waitFor from "p-wait-for";
import { CUSTOM_TAG_NAME } from "@/constant";
import Preview from "./components/preview";

export function getChatSegments() {
  return document.querySelector(".chat-content-list") as HTMLElement;
}

export function getFirstPreDom() {
  return document.querySelector("pre") as HTMLElement;
}

export default defineUnlistedScript(async () => {
  await waitFor(() => getChatSegments() != null && getFirstPreDom() != null);
  const root = createRoot(document.querySelector(CUSTOM_TAG_NAME)!);
  root.render(<Preview />);
});
