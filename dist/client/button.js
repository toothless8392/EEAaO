/*
_______________________
MEMO at first page
_______________________
*/
const memoBtn = document.getElementById("MEMO");
let memoBtnImg = memoBtn.querySelector("img");


memoBtn.addEventListener("mousedown", () =>
{
    memoBtnImg.src = "images/memoPressed.png";
});

memoBtn.addEventListener("mouseup", initButtonImage_memo);
memoBtn.addEventListener("mouseleave", initButtonImage_memo);

function initButtonImage_memo()
{
    memoBtnImg.src = "images/memoButton.png";
}

const memoPopup = document.getElementById("memoPopup");
memoBtn.addEventListener("click", () =>
{
    memoPopup.style.display = "flex";
});

document.getElementById("memoClose").addEventListener("click", () =>
{
    memoPopup.style.display = "none";
});

/*
_______________________
RETRY at first page
_______________________
*/
const retryBtn1 = document.getElementById("RETRY");
let retryBtnImg1 = retryBtn1.querySelector("img");


retryBtn1.addEventListener("mousedown", () =>
{
    retryBtnImg1.src = "images/retryPressed.png";
});

retryBtn1.addEventListener("mouseup", initButtonImage_retry1);
retryBtn1.addEventListener("mouseleave", initButtonImage_retry1);

function initButtonImage_retry1()
{
    retryBtnImg1.src = "images/retryButton.png";
}

/*
_______________________
NEXT at first page
_______________________
*/
const nextBtn1 = document.getElementById("NEXT");
let nextBtnImg1 = nextBtn1.querySelector("img");

nextBtn1.addEventListener("mousedown", () =>
{
    nextBtnImg1.src = "images/nextPressed.png";
});

nextBtn1.addEventListener("mouseup", initButtonImage_next1);
nextBtn1.addEventListener("mouseleave", initButtonImage_next1);

function initButtonImage_next1()
{
    nextBtnImg1.src = "images/nextButton.png";
}

const secondPage = document.getElementById("secondPage");
            
nextBtn1.addEventListener("click", () =>
{
    secondPage.style.display = "block";
});

/*
_______________________
NEXT at seond page
_______________________
*/

const nextBtn2 = document.getElementById("NEXT_SECOND");
let nextBtnImg2 = nextBtn2.querySelector("img");

nextBtn2.addEventListener("mousedown", () =>
{
    nextBtnImg2.src = "images/nextPressed.png"
});

nextBtn2.addEventListener("mouseup", initButtonImage_next2);
nextBtn2.addEventListener("mouseleave", initButtonImage_next2);

function initButtonImage_next2()
{
    nextBtnImg2.src = "images/nextButton.png"
}


nextBtn2.addEventListener("click", () =>
{
    document.getElementById("mainframe").src = "images/thirdPage.png";
    const retryButton = document.getElementById("RETRY");


    let buttons = document.getElementById("firstPageButtons");
    buttons.parentNode.removeChild(buttons);
    let visualizer = document.getElementById("visualizerFrame");
    visualizer.parentNode.removeChild(visualizer);
                
    retryButton.style.left = "1702px";
    retryButton.style.top = "22px";
    document.getElementById("mainScene").appendChild(retryButton);

    // Create SAVE button
    createSaveButton();

                
    document.getElementById("poster").style.display = "flex";
    secondPage.style.display = "none";
});

function createSaveButton()
{
    console.log("!!");
    const saveBtn = document.createElement("button");
    saveBtn.id = "SAVE";
    saveBtn.style.cssText = 
    `
        position: absolute;
        left: 1702px;
        top: 130px;
        width: 239px;
        height: 90px;
        border: #c4c4c4;
    `;

    const saveBtnImg = document.createElement("img");
    saveBtnImg.style.cssText =
    `
        position: absolute;
        left: 0px;
        top: 0px;
        width: 239px;
        height: 90px;
    `;

    saveBtnImg.src = "images/saveButton.png";
    saveBtn.appendChild(saveBtnImg);

    saveBtn.addEventListener("mousedown", () =>
    {
        saveBtnImg.src = "images/savePressed.png";
    })
    saveBtn.addEventListener("mouseup", () =>
    {
        saveBtnImg.src = "images/saveButton.png";
    })
    saveBtn.addEventListener("mouseleave", () =>
    {
        saveBtnImg.src = "images/saveButton.png";
    })
    saveBtn.addEventListener("click", capture);


    document.getElementById("mainScene").appendChild(saveBtn);
}



const capture = async () =>
{
    try
    {
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
        const video = document.createElement("video");

        video.addEventListener("loadedmetadata", () =>
        {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.style.cssText = 
            `
                position: absolute;
                left: 730px;
                top: 106px;
                width: 813px;
                height: 1062px;
                background-color: rgb(255, 0, 0);
            `;
            canvas.width = 813;
            canvas.height = 1062;
            
            console.log(`width: ${canvas.width}, height: ${canvas.height}`);

            video.play();

            ctx.drawImage(video, 730, 106, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            console.log(video.videoWidth, video.videoHeight);
            stream.getVideoTracks()[0].stop();
                        
            const imgUrl = canvas.toDataURL();
            const downloadSrc = document.createElement("a");
            downloadSrc.href = imgUrl
            downloadSrc.download = "Everything Everywhere All at Once.png";
            downloadSrc.click();
                        
        });
        video.srcObject = stream;
    }
    catch (err)
    {
        console.log(err);
    }
}
            
