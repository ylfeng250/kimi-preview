import { KIMI_PREVIEW_BTN } from "@/constant";
import { Button, Drawer, Space } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

export interface PreviewBtnProps {
  preDom: HTMLElement;
}
export default function PreviewBtn(props: PreviewBtnProps) {
  const { preDom } = props;
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };
  const handleClick = () => {
    const codeDom = preDom.querySelector("code");
    if (!codeDom) return;
    const code = codeDom.innerText;
    setCode(code);
    setOpen(true);
  };

  const handleColose = () => {
    setOpen(false);
    setCode("");
  };

  return (
    <>
      <Button
        className={KIMI_PREVIEW_BTN}
        size="small"
        type="link"
        color="primary"
        onClick={handleClick}
        style={{
          padding: "0 4px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        预览
      </Button>
      <Drawer
        title="预览"
        placement="right"
        open={open}
        onClose={handleColose}
        mask={false}
        width={fullScreen ? "100%" : "30%"}
        extra={
          <Space>
            <Button
              type="text"
              onClick={toggleFullScreen}
              icon={
                fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
              }
            ></Button>
          </Space>
        }
      >
        <iframe
          ref={iframeRef}
          srcDoc={code}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </Drawer>
    </>
  );
}
