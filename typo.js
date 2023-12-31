class Typo
{
    name;
    nameIdx;
    style;
    styleIdx;
    color;
    colorIdx;

    constructor(name, nameIdx, style, styleIdx, color, colorIdx)
    {
        this.name = name;
        this.nameIdx = nameIdx;
        this.style = style;
        this.styleIdx = styleIdx;
        this.color = color;
        this.colorIdx = colorIdx;
    }

    copy(other)
    {
        this.name = other.name;
        this.nameIdx = other.nameIdx;
        this.style = other.style;
        this.styleIdx = other.styleIdx;
        this.color = other.color;
        this.colorIdx = other.colorIdx;
    }
}

let selectedStyleRow = null;
let selectedColorRow = null;

const styleMenu = document.getElementById("style");
const styleRows = styleMenu.querySelectorAll(".styleRow");
const colorMenu = document.getElementById("color");
const colorRows = colorMenu.querySelectorAll(".styleRow");

const posterTypo = document.getElementById("TYPO");

for (let i = 0; i < styleRows.length; ++i)
{
    styleRows[i].rowIndex = i;
    //console.log(styleRows[i].rowIndex);
}

for (let i = 0; i < colorRows.length; ++i)
{
    colorRows[i].rowIndex = i;
}


const multimapTable = document.getElementById("multimapTable");
const typoRows = multimapTable.querySelectorAll("tr");
let currentTypo = null;

let selectedTypoRow = null;
let selectedTypoName = "";
let selectedImgUrl = "";

for (let i = 0; i < typoRows.length; ++i)
{
    //typoRows[i].rowIndex = i;
    //console.log(typoRows[i].rowIndex);
    typoRows[i].addEventListener("click", (e) =>
    {
        if (selectedTypoRow === null)
        {
            selectedTypoRow = e.currentTarget;
        }
        else
        {
            let tds = selectedTypoRow.querySelectorAll("td");
            tds[0].style.backgroundColor = "#FFFFFF";
            tds[1].style.backgroundColor = "#FFFF00";

            selectedTypoRow = e.currentTarget;
        }

        let tds = selectedTypoRow.querySelectorAll("td");
        tds[0].style.backgroundColor = "#32641D";
        tds[1].style.backgroundColor = "#32641D";

        createVerceJumperRow();
        loadStyle();
    })
}

const verceJumper = document.getElementById("verceJumper");
const VERCEJUMPER_HEIGHT = 857;
const SCROLLSPACE_HEIGHT = 763;

let verceJumperList = [];
let currentVJIdx = -1;
let selectedVJRow = null;

let scrollBarCreated = false;
const scrollSpace = document.getElementById("verceJumperScrollSpace");
const scrollBar = scrollSpace.querySelector("img");

function createVerceJumperRow()
{
    let newTypo = getDefaultMultiMap(selectedTypoRow.className);
    currentVJIdx = verceJumperList.length;
    verceJumperList.push(newTypo);
    currentTypo = verceJumperList[currentVJIdx];

    let radioDiv = document.createElement("div");
    radioDiv.className = "verceJumperRadio";

    let radioBtn = document.createElement("div");
    radioBtn.className = "verceJumperRadioBtn";
    radioDiv.appendChild(radioBtn);

    let radioSelected = document.createElement("div");
    radioSelected.className = "verceJumperRadioSelected";
    radioSelected.style.opacity = "1";
    radioBtn.appendChild(radioSelected);

    let imgDiv = document.createElement("div");
    imgDiv.className = "verceJumperImg";


    let newImg = document.createElement("img");
    newImg.src = getImgUrl(verceJumperList[currentVJIdx]);
    newImg.className = `VJ${newTypo.name}`;

    imgDiv.appendChild(newImg);

    let newRow = document.createElement("div");
    newRow.className = "verceJumperRow";
    newRow.rowIndex = currentVJIdx;

    if (selectedVJRow !== null)
    {
        selectedVJRow.id = "";
        selectedVJRow.getElementsByClassName("verceJumperRadioSelected").item(0).style.opacity = "0";
    }
    newRow.id = "verceJumperRowSelected";

    selectedVJRow = newRow;

    newRow.appendChild(radioDiv);
    newRow.appendChild(imgDiv);

    verceJumper.appendChild(newRow);

    newRow.addEventListener("click", (e) =>
    {
        currentVJIdx = e.currentTarget.rowIndex;
        
        selectedVJRow.id = "";
        selectedVJRow.getElementsByClassName("verceJumperRadioSelected").item(0).style.opacity = "0";

        selectedVJRow = e.currentTarget;
        selectedVJRow.id = "verceJumperRowSelected";
        selectedVJRow.getElementsByClassName("verceJumperRadioSelected").item(0).style.opacity = "1";
        
        //console.log(verceJumperList[currentVJIdx]);
        loadStyle();
    });


    
    if (verceJumper.scrollHeight > VERCEJUMPER_HEIGHT)
    {
        if (!scrollBarCreated)
        {
            document.getElementById("verceJumperScroll").style.display = "flex";
            scrollBarCreated = true;

            verceJumper.addEventListener("scroll", (e) =>
            {
                const scrollTop = Math.round(verceJumper.scrollTop * 763 / verceJumper.scrollHeight);
                scrollBar.style.top = `${scrollTop}px`;
            });
        }
        //const scrollTop = Math.round(verceJumper.scrollTop * 668 / verceJumper.scrollHeight);
        const scrollHeight = Math.round(SCROLLSPACE_HEIGHT * VERCEJUMPER_HEIGHT / verceJumper.scrollHeight);
        const scrollTop = 668 - scrollHeight;
        // console.log(scrollHeight);
        console.log(verceJumper.clientHeight);
        console.log(verceJumper.scrollHeight);
        verceJumper.scrollTop = verceJumper.scrollHeight - 750;
        scrollBar.style.top = `${scrollTop}px`;
        scrollBar.style.height = `${scrollHeight}px`;
    }
}



function loadStyle()
{
    const currentTypo = verceJumperList[currentVJIdx];

    if (selectedStyleRow !== null)
    {
        selectedStyleRow.id = "";
    }
    selectedStyleRow = styleRows[currentTypo.styleIdx];
    selectedStyleRow.id = "styleSelectedRow";


    const styles = styleList[currentTypo.nameIdx];
    for (let i = 0; i < styles.length; ++i)
    {
        styleRows[i].children[1].innerHTML = `<p>${styles[i]}</p>`;
        styleRows[i].addEventListener("click", (e) =>
        {

            if (selectedStyleRow !== null)
            {
                selectedStyleRow.id = "";
            }
            e.currentTarget.id = "styleSelectedRow";
            selectedStyleRow = e.currentTarget;
            verceJumperList[currentVJIdx].styleIdx = selectedStyleRow.rowIndex;

            selectedImgUrl = getImgUrl(verceJumperList[currentVJIdx]);
            loadColor();
        })
    }
    if (styleRows.length > styles.length)
    {
        for (let i = styles.length; i < styleRows.length; ++i)
        {
            styleRows[i].children[1].innerHTML = "";
            styleRows[i].onclick = "";
            styleRows[i].id = "";
        }
        styleMenu.style.overflow = "hidden";
    }
    else
    {
        styleMenu.style.overflow = "auto";
    }

    loadColor();
}

function loadColor()
{
    const currentTypo = verceJumperList[currentVJIdx];
    //currentTypo.colorIdx = 0;
    if (selectedColorRow !== null)
    {
        selectedColorRow.id = "";
    }
    if (currentTypo.nameIdx !== 7)
    {
        selectedColorRow = colorRows[currentTypo.colorIdx];
        selectedColorRow.id = "styleSelectedRow";
    }
    else
    {
        selectedColorRow = null;
    }

    const colors = colorList[currentTypo.nameIdx][currentTypo.styleIdx];
    for (let i = 0; i < colors.length; ++i)
    {
        colorRows[i].children[1].innerHTML = `<p>${colors[i]}</p>`;
        colorRows[i].addEventListener("click", (e) =>
        {
            if (selectedColorRow !== null)
            {
                selectedColorRow.id = "";
            }
            selectedColorRow = e.currentTarget;
            selectedColorRow.id = "styleSelectedRow";
            verceJumperList[currentVJIdx].colorIdx = selectedColorRow.rowIndex;

            const url = getImgUrl(verceJumperList[currentVJIdx]);
            selectedVJRow.children[1].querySelector("img").src = url;
            posterTypo.src = url;
            if (1 === verceJumperList[currentVJIdx].nameIdx)
            {
                posterTypo.style.width = "70%";
                posterTypo.style.height = "auto";
            }
            else
            {
                posterTypo.style.width = "auto";
                posterTypo.style.height = "100%";
            } 
        });
    }
    if (4 > colors.length)
    {
        for (let i = colors.length; i < colorRows.length; ++i)
        {
            colorRows[i].children[1].innerHTML = "";
            colorRows[i].id = "";
            colorRows[i].onclick = "";
        }
        colorMenu.style.overflow = "hidden";
    }
    else
    {
        colorMenu.style.overflow = "auto";
    }


    const url = getImgUrl(verceJumperList[currentVJIdx]);
    selectedVJRow.children[1].querySelector("img").src = url;
    posterTypo.src = url;
    if (1 === verceJumperList[currentVJIdx].nameIdx)
    {
        posterTypo.style.width = "70%";
        posterTypo.style.height = "auto";
    }
    else
    {
        posterTypo.style.width = "auto";
        posterTypo.style.height = "100%";
    }
    // console.log(posterTypo);
    // posterTypo.clientWidth = posterTypo.clientHeight * imgRatio[verceJumperList[currentVJIdx].nameIdx];
    // console.log(posterTypo.clientWidth, posterTypo.clientHeight);
    // console.log(posterTypo.style.width, posterTypo.style.height);
}

function getImgUrl(typo)
{
    switch (typo.name)
    {
        case "hotdogfinger":
            return `typo/hotdogfinger/${styleList[typo.nameIdx][typo.styleIdx]}/${colorList[typo.nameIdx][typo.styleIdx][typo.colorIdx]}.png`.toLowerCase();

        case "michelle":
            return `typo/michelle/${styleList[typo.nameIdx][typo.styleIdx]}.png`.toLowerCase();

        default:
            return `typo/${typo.name}/${colorList[typo.nameIdx][typo.styleIdx][typo.colorIdx]}.png`.toLowerCase();
    }
}

function getDefaultMultiMap(typoName)
{
    switch (typoName)
    {
        case "hotdogfinger":
            return new Typo(typoName, 0, "Emphasized", 2, "WHITE", 2);
        case "rock":
            return new Typo(typoName, 1, "Regular", 0, "WHITE", 1);
        case "rules":
            return new Typo(typoName, 2, "Regular", 0, "WHITE", 3);
        case "eb":
            return new Typo(typoName, 3,"Regular", 0, "WHITE", 3);
        case "raccacoonie":
            return new Typo(typoName, 4, "Regular", 0, "BLACK", 0);
        case "charcoal":
            return new Typo(typoName, 5, "Regular", 0, "BLACK", 0);
        case "bloat":
            return new Typo(typoName, 6,"Regular", 0, "WHITE", 3);
        case "michelle":
            return new Typo(typoName, 7,"Outlined", 2, null, null);
    }
}

const retryButton2 = document.getElementById("RETRY2");
retryButton2.addEventListener("click", (e) =>
{
    verceJumperList.length = 0;
    scrollBarCreated = false;
    currentVJIdx = -1;
    currentTypo = null;

    if (selectedTypoRow !== null)
    {
        let tds = selectedTypoRow.querySelectorAll("td");
        tds[0].style.backgroundColor = "#FFFFFF";
        tds[1].style.backgroundColor = "#FFFF00";

        selectedTypoRow = null;
    }

    if (selectedVJRow !== null)
    {
        selectedVJRow.id = "";
        selectedVJRow = null;
    }
    if (selectedStyleRow !== null)
    {
        selectedStyleRow.id = "";
        selectedStyleRow = null;
    }
    if (selectedColorRow !== null)
    {
        selectedColorRow.id = "";
        selectedColorRow = null;
    }
    selectedImgUrl = "";
    
    while (verceJumper.firstChild)
    {
        verceJumper.removeChild(verceJumper.lastChild);
    }

    for (let i = 0; i < styleRows.length; ++i)
    {
        styleRows.item(i).children[1].innerHTML = "";
    }
    for (let i = 0; i < colorRows.length; ++i)
    {
        colorRows.item(i).children[1].innerHTML = "";
    }
})

const typoList =
[
    "hotdogfinger",
    "rock",
    "rules",
    "eb",
    "raccacoonie",
    "charcoal",
    "bloat",
    "michelle"
];

const styleList = 
[
    ["Light", "Regular", "Emphasized"], // hotdogfinger
    ["Regular"],    // rock
    ["Regular"],    // rules
    ["Regular"],    // eb
    ["Regular"],    // raccacoonie
    ["Regular"],    // charcoal
    ["Regular"],    // bloat
    ["Filled", "Multicolored", "Outlined", "Regular"], // michelle
]

const colorList =
[
    [
        ["BLACK", "GREEN", "RED"],
        ["BLACK", "GREEN", "RED", "YELLOW"],
        ["GREEN", "RED", "WHITE", "YELLOW"],
    ],
    [["BLACK", "WHITE"]],
    [["BLACK", "GREEN", "RED", "WHITE"]],
    [["BLACK", "GREEN", "RED", "WHITE", "YELLOW"]],
    [["BLACK", "GREEN", "RED", "YELLOW"]],
    [["BLACK", "GREEN", "RED"]],
    [["BLACK", "GREEN", "RED", "WHITE", "YELLOW"]],
    [
        [],
        [],
        [],
        [],
    ],
]

const imgRatio = 
[
    1.78,
    4.67,
    1.26,
    1.60,
    1.60,
    1.56,
    1.55,
    1.39
];