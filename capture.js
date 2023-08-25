import html2canvas from "../../node_modules/html2canvas/dist/types/index.d.ts";

export function capturePoster()
{
    html2canvas(document.getElementById("capture")).then((canvas) =>
    {
        const imgUrl = canvas.toDataURL();
        const downloadSrc = document.createElement("a");
        downloadSrc.href = imgUrl
        downloadSrc.download = "Everything Everywhere All at Once.png";
        downloadSrc.click();
    });
}