const cursorPoints = document.getElementsByClassName("cursorPoint");
const guideBoxes = document.getElementsByClassName("guideBox");

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
}