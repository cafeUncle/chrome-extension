// 获取 id 集合
function get_ids() {
  arr = document.getElementsByClassName('log___1Q8TJ')

  var ids = []

  for(var k in arr) {
    if (arr[k].textContent) {
       m_r = arr[k].textContent.match('memberId: ([0-9]*)')
       if (m_r) {
          ids.push(m_r[1])
       }
    }
  }

  ids = Array.from(new Set(ids))
  return ids.join(',') || '无'
}

// content script 向 backgroud 或 popup 发消息，并收到回复
// 在 content script 中 使用 sendMessage 发送消息，在接收方使用 runtime.onMessage 或者 runtime.onMessageExternal
// 向自己的扩展程序发送消息就接受方使用 onMessage，如果是向另一个扩展程序发送则使用 onMessageExternal
chrome.runtime.sendMessage({ greeting: "启动了！" }, function (response) {
    console.log("content 收到回复：" + response);
});

// content script 监听来自 backgroud 或 popup 的消息
// 如果多个页面都监听 onMessage 事件，对于某一次事件只有第一次调用 sendResponse() 能成功发出回应，所有其他回应将被忽略。
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request === "get id") {
      console.log("content get id received:", request);
      console.log(get_ids())
    }
    if (request === "heartbeat msg") {
      console.log("content heartbeat received")
    }
    if (sendResponse) {
      sendResponse("content back")
    }
  }
);
