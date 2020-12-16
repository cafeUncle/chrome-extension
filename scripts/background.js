// 扩展程序向 content script 发送信息使用的就是 tabs.sendMessage
// 需要指定发送至哪一个标签页
function sendMessageToContentScript(message, callback){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var tabId = tabs.length ? tabs[0].id: null;
    if (tabId) {
      chrome.tabs.sendMessage(tabId, message, callback ? function(response) {
  			if(callback) {
          callback(response);
        }
  		} : null)
    } else {
      console.log('找不到激活的标签页');
    }
	})
}

function sendMessageToPopup(msg) {
  // background 访问 popup 如下，popup 打开时才能获取到
  // 每次打开或刷新 backgroud，js 都会重新加载，下段代码都会重新执行

  // 调试步骤：
  //
  // 先打开背景页，console tab 下会输出 ---views--- []
  // 点击你的扩展，弹出 popup 页面
  // 刷新背景页面的控制台，就可以看到输出的内容了
  var views = chrome.extension.getViews({ type: "popup" });
  console.log("---views---", views);
  if (views.length > 0) {
      console.log(views[0].location.href);
      views[0].popheart(msg)
  }
}

function dojob() {
  sendMessageToContentScript('get id', (res) => {
    console.log('b received =', res)
  })
}

function heartbeat() {
  sendMessageToContentScript('heartbeat msg')
  sendMessageToPopup('b->p')
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('background 收到消息：' + request);
    if (sendResponse) {
      sendResponse("backgroud back")
    }
  }
);

// end
