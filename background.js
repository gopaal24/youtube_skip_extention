function fire(tabId) {
    chrome.tabs.sendMessage(tabId, {message: "youtube"})
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete' && tab.active){
        if(tab.url && tab.url.includes("youtube.com/watch")){
            fire(tabId)
        }
    }
})
