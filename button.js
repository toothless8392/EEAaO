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
RETRY at third page
_______________________
*/
const retryBtn2 = document.getElementById("RETRY2");
let retryBtnImg2 = retryBtn2.querySelector("img");


retryBtn2.addEventListener("mousedown", () =>
{
    retryBtnImg2.src = "images/retryPressed.png";
});

retryBtn2.addEventListener("click", (e) =>
{
    memoPopup.style.display = "flex";
})

retryBtn2.addEventListener("mouseup", initButtonImage_retry2);
retryBtn2.addEventListener("mouseleave", initButtonImage_retry2);

function initButtonImage_retry2()
{
    retryBtnImg2.src = "images/retryButton.png";
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
NEXT at second page
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


const firstPageButtons = document.getElementById("firstPageButtons");

const dateP = document.getElementById("date");
const noP = document.getElementById("no");
let posterNo = 1;

nextBtn2.addEventListener("click", () =>
{
    document.getElementById("mainframe").src = "images/thirdPage.png";

    firstPageButtons.style.display = "none";

    const visualizer = document.getElementById("visualizerFrame");
    visualizer.style.display = "none";
    
    const cursor = document.getElementById("guide");
    cursor.style.display = "none";
    
    retryBtn2.style.display = "flex";
    
    saveBtn.style.display = "flex";

                
    document.getElementById("poster").style.display = "flex";
    secondPage.style.display = "none";



    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth();
    month = (month >= 9 ? `${month + 1}` : `0${month + 1}`);

    let date = now.getDate();
    date = (date >=10 ? `${date}` : `0${date}`);

    let hour = now.getHours();
    hour = (hour >= 10 ? `${hour}` : `0${hour}`);

    let minute = now.getMinutes();
    minute = (minute >= 10 ? `${minute}` : `0${minute}`);

    dateP.innerText = `${year}.${month}.${date} ${hour}:${minute}`;

    console.log(dateP.innerText);

    if (posterNo < 10)
    {
        noP.innerText = `NO . 000${posterNo}`;
    }
    else if (posterNo < 100)
    {
        noP.innerText = `NO . 00${posterNo}`;
    }
    else if (posterNo < 1000)
    {
        noP.innerText = `NO . 0${posterNo}`;
    }
    else
    {
        noP.innerText = `NO . ${posterNo}`;
    }
    console.log(noP.innerText);
    posterNo++;
});

const saveBtn = document.getElementById("SAVE");
const saveBtnImg = saveBtn.querySelector("img");

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
//saveBtn.addEventListener("click", capture);



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
            canvas.width = 929;
            canvas.height = 1214;
            
            console.log(`width: ${canvas.width}, height: ${canvas.height}`);

            video.play();

            ctx.drawImage(video, 829, 121, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
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
          

saveBtn.addEventListener("click", capture);

// function capture()
// {
//     window.html2canvas(document.getElementById("capture")).then(canvas =>
//         {
//             const imgUrl = canvas.toDataURL();
//             const downloadSrc = document.createElement("a");
//             downloadSrc.href = imgUrl
//             downloadSrc.download = "Everything Everywhere All at Once.png";
//             downloadSrc.click();
//         });
// }
