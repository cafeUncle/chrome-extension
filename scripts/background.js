
function print() {
  console.log(chrome.browserAction)
}

function updateIcon() {
  chrome.storage.sync.get('number', function(data) {
    var current = data.number;
    if (!current) {
      current = 1
    }
    chrome.browserAction.setIcon({path: 'img/icon' + current + '.png'});
    current++;
    if (current > 3)
      current = 1;
    chrome.storage.sync.set({number: current}, function() {
      console.log('The number is set to ' + current);
    });
  });
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({number: 1}, function() {
    console.log('The number is set to 1.');
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "g_id2") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", request.data);

      sendResponse({ action: "g_id——d" });

      sendMsg()
    }
  }
);

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

function sendMessageToContentScript(message, callback){
	getCurrentTabId((tabId) => {
		chrome.tabs.sendMessage(tabId, message, function(response) {
			if(callback) {
        callback(response);
      }
		})
	})
}

function sendMsg() {
  sendMessageToContentScript('你好，我是bg！', (response) => {
  	if(response) alert('收到来自content-script的回复：'+response);
  });
}

// chrome.browserAction.onClicked.addListener(updateIcon);
// updateIcon();
