// const multimap = document.getElementById("multimap");
// const multimapScrollBar = document.getElementById("multimapScrollBar");
// const ctx = multimapScrollBar.getContext("2d");

// const multimapWidth = multimap.clientWidth;
// const multimapHeight = multimap.clientHeight;
// const totalHeight = multimap.scrollHeight;
// console.log(totalHeight);
// const scrollBar = new Image();
// scrollBar.src = "images/scrollBar.png";
// console.log(multimapScrollBar.style.width);
// scrollBar.style.width = "41px";
// scrollBar.style.height = "425px";
// scrollBar.width = 41;
// scrollBar.height = 425;

// scrollBar.addEventListener("load", (e) =>
// {
//     ctx.drawImage(scrollBar, 0, 0, 41, 425);
//     console.log(scrollBar);
//     // ctx.fillRect(0, 0, 41, 425);

//     console.log(scrollBar.height);
//     multimap.addEventListener("scroll", (e) =>
//     {
//         ctx.clearRect(0, 0, 41, 744);
//         const scrollY = multimap.scrollTop * 744 / 1444;
//         ctx.drawImage(scrollBar, 0, scrollY, 41, 425);
//     });
// });

// scrollBar.addEventListener("mousedown", (e) =>
// {
//     console.log("!!");
// });


const multimapScrollBarSpace = document.getElementById("multimapScrollBarSpace");
const multimapScrollBar = multimapScrollBarSpace.querySelector("img");

const multimap = document.getElementById("multimap");

multimap.addEventListener("scroll", (e) =>
{
    // console.log(multimap.scrollTop);
    const scrollY = Math.round(multimap.scrollTop * 744 / 1444);
    // console.log(scrollY);
    
    multimapScrollBar.style.top = `${scrollY}px`;
});