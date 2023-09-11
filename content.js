let ButtonsExist = false;
let SkipTime = 5;

let box1;
let box2;


console.log("youtube");

chrome.runtime.onMessage.addListener(
    function(message, sender, response){
        const info = message.message;
        
        if(info == "youtube" && !ButtonsExist){
            ButtonsExist = true;
            makeButtons(5);
            console.log("working");
        }
        else{
            console.log(info);
            SkipTime = info;
            makeButtons(info)
        }    
    }
)

function makeButtons(){
    console.log("making buttons");
    
    box1 = document.createElement("div");
    box2 = document.createElement("div");
    
    box1.className = "box1" ;
    box2.className = "box2" ;

    box1.title = `rewind ${SkipTime}s`;
    box2.title = `forward ${SkipTime}s`;
    
    const frwdbtn = document.createElement('img');
    const rwndbtn = document.createElement('img');
    
    frwdbtn.className = "frwd";
    rwndbtn.className = "rwnd";

    frwdbtn.src = chrome.runtime.getURL("assets/fast_forward.png");
    rwndbtn.src = chrome.runtime.getURL("assets/backward.png");

    box1.appendChild(rwndbtn);
    box2.appendChild(frwdbtn);

    frwd = box1;
    rwnd = box2;

    addButtons(box1, box2, SkipTime);
}   

function addButtons(rwnd, frwd, skip){

    console.log("adding buttons");
    SkipTime = skip;
    
    const element = document.getElementsByClassName("ytp-next-button")[0];
    
    insertAfter(element, frwd);
    insertAfter(element, rwnd);

    
    box1.addEventListener("click",()=> {
        shift(-skip);
    })
    
    box2.addEventListener("click",()=> {
        shift(skip);
    })
}

function insertAfter(referenceNode, newNode) {
    if(referenceNode.nextSibling.getAttribute("class") == "box1"){
        referenceNode.parentNode.removeChild(referenceNode.nextSibling);
        referenceNode.parentNode.removeChild(referenceNode.nextSibling);
    };
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

function shift(skip) {
    const stream = document.getElementsByClassName("video-stream")[0];
    stream.currentTime += skip;
}