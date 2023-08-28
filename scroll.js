const multimapScrollBarSpace = document.getElementById("multimapScrollBarSpace");
const multimapScrollBar = document.getElementById("multimapScrollBar");

const multimap = document.getElementById("multimap");

multimap.addEventListener("scroll", (e) =>
{
    // console.log(multimap.scrollTop);
    const scrollY = Math.round(multimap.scrollTop * 850 / 1650);
    // console.log(scrollY);
    
    multimapScrollBar.style.top = `${scrollY}px`;
});