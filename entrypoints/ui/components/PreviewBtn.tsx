import { KIMI_PREVIEW_BTN } from "@/constant";
import { Button, Drawer, Space, Tooltip } from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";

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

  const downloadImage = () => {
    // 获取 iframe 内部的 document 对象
    let iframeDocument =
      iframeRef.current?.contentDocument ||
      iframeRef.current?.contentWindow?.document;

    // 获取 iframe 内 body 的第一个子节点
    var firstChild = iframeDocument?.body.firstElementChild as HTMLElement;

    if (!firstChild) return;
    // 创建一个新的 div 包裹目标元素并添加样式
    const wrapper = document.createElement("div");
    wrapper.style.padding = "8px";
    wrapper.style.backgroundColor = "white"; // 卡片背景颜色
    wrapper.style.borderRadius = "6px"; // 圆角
    wrapper.style.display = "inline-block"; // 使内容自适应
    wrapper.appendChild(firstChild.cloneNode(true)); // 克隆 SVG 内容

    document.body.appendChild(wrapper); // 将 wrapper 添加到 DOM 中

    html2canvas(wrapper, {
      backgroundColor: null, // 透明背景
      useCORS: true,
      scale: 2, // 提升画质
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${new Date().toLocaleDateString()}.png`;
      link.click();

      document.body.removeChild(wrapper); // 下载后移除 wrapper
    });
  };
  return (
    <>
      <Tooltip title="点击预览 html/svg 代码">
        <Button
          className={KIMI_PREVIEW_BTN}
          size="small"
          type="primary"
          onClick={handleClick}
        >
          预览
        </Button>
      </Tooltip>
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
            <Button icon={<DownloadOutlined />} onClick={downloadImage}>
              下载为图片
            </Button>
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
