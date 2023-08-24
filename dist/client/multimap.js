class MultiMap
{
    typo;
    style;
    styleIdx;
    color;
    colorIdx;

    constructor(typo, style, styleIdx, color, colorIdx)
    {
        this.typo = typo;
        this.style = style;
        this.styleIdx = styleIdx;
        this.color = color;
        this.colorIdx = colorIdx;
    }
}


const multimap = document.getElementById("multimapTable");
const rows = multimap.querySelectorAll("tr");
let selectedRow = null;
let typo = "";

const styleMenu = document.getElementById("style");
const colorMenu = document.getElementById("color");

let selectedVJRow = null;
const verceJumper = document.getElementById("verceJumper");
const verceJumperList = [];

let selectedImgSrc = "";
let currentMultiMap = null;

for (let i = 0; i < rows.length; ++i)
{
    rows[i].addEventListener("click", (e) =>
    {
        if(selectedRow === null)
        {
            selectedRow = e.currentTarget;
            typo = selectedRow.className;

            let tds = selectedRow.querySelectorAll("td");
            for (let j = 0; j < tds.length; ++j)
            {
                tds[j].style.backgroundColor = "#00AA00";
            }
        }
        else
        {
            let tds = selectedRow.querySelectorAll("td");
            tds[0].style.backgroundColor = "#FFFFFF";
            tds[1].style.backgroundColor = "#FFFF00";
            
            selectedRow = e.currentTarget;
            typo = selectedRow.className;

            tds = selectedRow.querySelectorAll("td");
            for (let j = 0; j < tds.length; ++j)
            {
                tds[j].style.backgroundColor = "#00AA00";
            }
        }
        
        
        selectedImgSrc = defaultImgSrc(typo);
        console.log(selectedStyle, selectedColor);        
        createVerceJumperRow();
        console.log(currentMultiMap);
        initStyleColor();
        updateImgSrc(typo);
    });
}

let selectedStyle = "";
let selectedStyleRow = null;
let selectedColor = "";
let selectedColorRow = null;

let styleRows = styleMenu.querySelectorAll(".styleRow");
let colorRows = colorMenu.querySelectorAll(".styleRow");


function initStyleColor()
{
    let typoIndex = typoHash(typo);

    // Set Styles
    let styles = styleList[typoIndex];
    for (let i = 0; i < styles.length; ++i)
    {
        styleRows[i].children[1].innerText = styles[i];
        styleRows[i].addEventListener("click", (e) =>
        {
            if (selectedStyleRow !== null)
            {
                selectedStyleRow.id = "";
            }
            e.currentTarget.id = "styleSelectedRow";
            selectedStyleRow = e.currentTarget;
            selectedStyle = selectedStyleRow.querySelector(".styleName").innerText;
            currentMultiMap.style = selectedStyle;
            initColor();
            console.log(typo);
            updateImgSrc(typo);
        })
    }
    if (styleRows.length > styles.length)
    {
        for (let i = styles.length; i < styleRows.length; ++i)
        {
            styleRows[i].children[1].innerText = "";
            styleRows[i].onclick = "";
        }
        styleMenu.style.overflow = "hidden"
    }
    else
    {
        styleMenu.style.overflow = "auto"
    }

    let colors = colorList[typoIndex];
    if (typo === "hotdogfinger")
    {
        switch (selectedStyle)
        {
            case "Light":
                colors = colorList[0][0];
                break;
            case "Regular":
                colors = colorList[0][1];
                break;
            case "Emphasized":
                colors = colorList[0][2];
                break;
            default:
                colors = colorList[0][2];
                break;
        }
    }
    console.log(colors);
    for (let i = 0; i < colors.length; ++i)
    {
        console.log(colors[i]);
        colorRows[i].children[1].innerText = colors[i];
        colorRows[i].addEventListener("click", (e) =>
        {
            if(selectedColorRow !== null)
            {
                selectedColorRow.id = "";
            }
            e.currentTarget.id = "styleSelectedRow";
            selectedColorRow = e.currentTarget;
            selectedColor = selectedColorRow.querySelector(".styleName").innerText;
            updateImgSrc(typo);
        });
    }
    if (colorRows.length > colors.length)
    {
        for (let i = colors.length; i < colorRows.length; ++i)
        {
            colorRows[i].children[1].innerText = "";
            colorRows[i].onclick = "";
        }
        colorMenu.style.overflow = "hidden";
    }
    else
    {
        colorMenu.style.overflow = "auto";
    }
}

function initColor()
{
    selectedColorRow.id = "";
    let typoIndex = typoHash(typo);
    let colors = colorList[typoIndex];
    if (typo === "hotdogfinger")
    {
        switch (selectedStyle)
        {
            case "Light":
                colors = colorList[0][0];
                break;
            case "Regular":
                colors = colorList[0][1];
                break;
            case "Emphasized":
                colors = colorList[0][2];
                break;
            default:
                colors = colorList[0][2];
                break;
        }
    }
    console.log(colors);
    for (let i = 0; i < colors.length; ++i)
    {
        console.log(colors[i]);
        colorRows[i].children[1].innerText = colors[i];
        colorRows[i].addEventListener("click", (e) =>
        {
            if(selectedColorRow !== null)
            {
                selectedColorRow.id = "";
            }
            e.currentTarget.id = "styleSelectedRow";
            selectedColorRow = e.currentTarget;
            selectedColor = selectedColorRow.querySelector(".styleName").innerText;
            currentMultiMap.color = selectedColor;
            updateImgSrc(typo);
        });
    }
    if (colorRows.length > colors.length)
    {
        for (let i = colors.length; i < colorRows.length; ++i)
        {
            colorRows[i].children[1].innerText = "";
            colorRows[i].onclick = "";
        }
        colorMenu.style.overflow = "hidden";
    }
    else
    {
        colorMenu.style.overflow = "auto";
    }
}

function removeChildren(parent)
{
    while (parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
}


function createVerceJumperRow()
{
    if (selectedVJRow === null)
    {
        const newRow = document.createElement("div");
        newRow.className = "verceJumperRow";
        newRow.id = "verceJumperRowSelected";

        const vjRadio = document.createElement("div");
        vjRadio.className = "verceJumperRadio";

        const vjImg = document.createElement("div");
        vjImg.className = "verceJumperImg";
        

        let newImg = document.createElement("img");
        newImg.src = defaultImgSrc(typo);
        newImg.width = 200;
        newImg.height = 200;

        vjImg.appendChild(newImg);

        newRow.appendChild(vjRadio);
        newRow.appendChild(vjImg);

        selectedVJRow = newRow;
        selectedVJRow.addEventListener("click", (e) =>
        {
            const verceJumperRows = verceJumper.children;
            console.log(verceJumperRows);
            let i = 0;
            for (i = 0; i < verceJumper.children.length; ++i)
            {
                if (e.currentTarget === children[i])
                {
                    break;
                }
            }

            currentMultiMap = verceJumperList[i];
            updateMultiMap();
        });

        verceJumper.appendChild(newRow);

        currentMultiMap = defaultMultiMap(typo);
        verceJumperList.push(currentMultiMap);
    }
    else
    {
        selectedVJRow.id = "";

        const newRow = document.createElement("div");
        newRow.className = "verceJumperRow";
        newRow.id = "verceJumperRowSelected";

        const vjRadio = document.createElement("div");
        vjRadio.className = "verceJumperRadio";

        const vjImg = document.createElement("div");
        vjImg.className = "verceJumperImg";

        const newImg = document.createElement("img");
        newImg.src = defaultImgSrc(typo);
        newImg.width = 200;
        newImg.height = 200;

        vjImg.appendChild(newImg);

        newRow.appendChild(vjRadio);
        newRow.appendChild(vjImg);

        selectedVJRow = newRow;
        selectedVJRow.addEventListener("click", (e) =>
        {
            const verceJumperRows = verceJumper.children;
            console.log(verceJumperRows);
            let i = 0;
            for (i = 0; i < children.length; ++i)
            {
                if (e.currentTarget === children[i])
                {
                    break;
                }
            }

            currentMultiMap = verceJumperList[i];
            loadMultiMap();
        });

        verceJumper.appendChild(newRow);

        currentMultiMap = defaultMultiMap(typo);
        verceJumperList.push(currentMultiMap);
    }
}

function loadMultiMap()
{
    typo = currentMultiMap.typo;
    initStyleColor();
    if (selectedStyleRow !== null)
        {
            selectedStyleRow.id = "";
        }
        if (selectedColorRow !== null)
        {
            selectedColorRow.id = "";
        }
    if (currentMultiMap.typo !== "michelle")
    {        
        selectedStyleRow = styleMenu.children[currentMultiMap.styleIdx];
        selectedStyleRow.id = "styleSelectedRow";
        selectedStyle = selectedStyleRow.children[1].innerText;

        selectedColorRow = colorMenu.children[currentMultiMap.colorIdx];
        selectedColorRow.id = "styleSelectedRow";
        selectedColor = selectedColorRow.children[1].innerText;
    }
    else
    {
        selectedStyleRow = styleMenu.children[currentMultiMap.styleIdx];
        selectedStyleRow.id = "styleSelectedRow";
        selectedStyle = selectedStyleRow.children[1].innerText;
        selectedColorRow = null
        selectedColorRow.id = "";
        selectedColor = "";
    }
    
    selectedImgSrc = getUrlFromMultiMap(currentMultiMap);
}

function typoHash(typo)
{
    switch (typo)
    {
        case "hotdogfinger":
            return 0;
        case "rock":
            return 1;
        case "rules":
            return 2;
        case "eb":
            return 3;
        case "raccacoonie":
            return 4;
        case "charcoal":
            return 5;
        case "bloat":
            return 6;
        case "michelle":
            return 7;        
    }
}


function defaultMultiMap(typo)
{
    switch (typo)
    {
        case "hotdogfinger":
            return new MultiMap(typo, "Emphasized", 2, "WHITE", 2);
        case "rock":
            return new MultiMap(typo, "Regular", 0, "WHITE", 1);
        case "rules":
            return new MultiMap(typo, "Regular", 0, "WHITE", 3);
        case "eb":
            return new MultiMap(typo, "Regular", 0, "WHITE", 3);
        case "raccacoonie":
            return new MultiMap(typo, "Regular", 0, "BLACK", 0);
        case "charcoal":
            return new MultiMap(typo, "Regular", 0, "BLACK", 0);
        case "bloat":
            return new MultiMap(typo, "Regular", 0, "WHITE", 3);
        case "michelle":
            return new MultiMap(typo, "Outlined", 2, null, null);
    }
}

function getUrlFromMultiMap(_multimap)
{
    switch (_multimap.typo)
    {
        case "hotdogfinger":
            return `typo/${_multimap.typo}/${_multimap.style}/${_multimap.color}.png`;
        case "michelle":
            return `typo/${_multimap.typo}/${_multimap.style}.png`;
        default:
            return `typo/${_mutlimap.typo}/${_multimap.color}.png`;
    }
}

function defaultImgSrc(typo)
{
    if (selectedStyleRow !== null)
    {
        selectedStyleRow.id = "";
    }
    if (selectedColorRow !== null)
    {
        selectedColorRow.id = "";
    }

    switch (typo)
    {
        case "hotdogfinger":
            selectedStyleRow = styleMenu.children[2];
            selectedStyleRow.id = "styleSelectedRow";
            selectedStyle = "Emphasized";
            selectedColorRow = colorMenu.children[2]
            selectedColorRow.id = "styleSelectedRow";
            selectedColor = "white";
            return "typo/hotdogfinger/emphasized/WHITE.png";
        case "rock":
            selectedStyleRow = styleMenu.children[0];
            selectedStyleRow.id = "styleSelectedRow";
            selectedStyle = "Regular";
            selectedColorRow = colorMenu.children[1]
            selectedColorRow.id = "styleSelectedRow";
            selectedColor = "white";
            return "typo/rock/white.png";
        case "rules":
            selectedStyleRow = styleMenu.children[0];
            selectedStyleRow.id = "styleSelectedRow";
            selectedStyle = "Regular";
            selectedColorRow = colorMenu.children[3]
            selectedColorRow.id = "styleSelectedRow";
            selectedColor = "white";
            return "typo/rules/white.png";
        case "eb":
            selectedStyleRow = styleMenu.children[0];
            selectedStyleRow.id = "styleSelectedRow";
            selectedStyle = "Regular";
            selectedColorRow = colorMenu.children[3]
            selectedColorRow.id = "styleSelectedRow";
            selectedColor = "white";
            return "typo/eb/white.png";
        case "raccacoonie":
            selectedStyleRow = styleMenu.children[0];
            selectedStyleRow.id = "styleSelectedRow";
            selectedStyle = "Regular";
            selectedColorRow = colorMenu.children[0]
            selectedColorRow.id = "styleSelectedRow";
            selectedColor = "black";
            return "typo/raccacoonie/black.png";
        case "charcoal":
            selectedStyleRow = styleMenu.children[0];
            selectedStyleRow.id = "styleSelectedRow";
            selectedStyle = "Regular";
            selectedColorRow = colorMenu.children[0]
            selectedColorRow.id = "styleSelectedRow";
            selectedColor = "black";
            return "typo/charcoal/black.png";
        case "bloat":
            selectedStyleRow = styleMenu.children[0];
            selectedStyleRow.id = "styleSelectedRow";
            selectedStyle = "Regular";
            selectedColorRow = colorMenu.children[3]
            selectedColorRow.id = "styleSelectedRow";
            selectedColor = "white";
            return "typo/bloat/white.png";
        case "michelle":
            selectedStyleRow = styleMenu.children[2];
            selectedStyleRow.id = "styleSelectedRow";
            selectedStyle = "Outlined";
            selectedColorRow.id = "";
            selectedColor = "";
            return "typo/michelle/outlined.png";        
    }
}

function updateImgSrc(typo)
{
    if (typo === "hotdogfinger")
    {
        console.log("!!");
        selectedImgSrc = `typo/hotdogfinger/${selectedStyle}/${selectedColor}.png`;
        console.log(selectedImgSrc);
    }
    else if (typo === "michelle")
    {
        selectedImgSrc = `typo/michelle/${selectedStyle}.png`;
    }
    else
    {
        selectedImgSrc = `typo/${typo}/${selectedColor}.png`;
    }

    selectedVJRow.querySelector("img").src = selectedImgSrc;
}

let typoList =
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

let styleList = 
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

let colorList =
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