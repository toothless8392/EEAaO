const cursorPoints = document.getElementsByClassName("cursorPoint");
const guideBoxes = document.getElementsByClassName("guideBox");
const cursorImgs = document.getElementsByClassName("cursorImg");

for (let i = 0; i < cursorPoints.length; ++i)
{
    let point = cursorPoints.item(i);
    
    cursorPoints.item(i).addEventListener("mouseover", (e) =>
    {
        guideBoxes.item(i).style.display = "flex";
    });

    cursorPoints.item(i).addEventListener("mouseleave", (e) =>
    {
        guideBoxes.item(i).style.display = "none";
    });

    cursorPoints.item(i).addEventListener("click", (e) =>
    {
        cursorPoints.item(i).style.display = "none";
        cursorImgs.item(i).style.display = "none";
    });
}