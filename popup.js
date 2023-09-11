const submit = document.getElementById("submit");
const value = document.getElementById("value");
const time = document.getElementById("time")
let skipTime;

submit.addEventListener("click", () => {
    value.innerHTML = `skip for ${time.value} seconds`;
    skipTime = time.value;
    valueChanged();
})

function valueChanged(){
    console.log(skipTime);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {message: skipTime});
    })
}