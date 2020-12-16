// popup 可以直接调用 background 中的 JS 方法，也可以直接访问 background 的 DOM，以及 popup 自己的 DOM
document.getElementById('get_id').addEventListener('click', function() {
  chrome.extension.getBackgroundPage().dojob()

})

document.getElementById('show').addEventListener('click', function() {
  chrome.extension.getBackgroundPage().heartbeat()
})

// popup 也可以直接用 chrome.runtime.sendMessage 给 content 发消息，同样要指定 tab_id

// content_scripts 向 popup 主动发消息的前提是 popup 必须打开！否则需要利用 background 作中转；
// 如果 background 和 popup 同时监听消息，那么它们都可以同时收到消息，但是只有一个可以 sendResponse，一个先发送了，那么另外一个再发送就无效；
// 理解上 popup 不需要监听消息，background 可以直接调 popup 的方法，而 content 的消息可以由 background 接收后由后者调用
chrome.runtime.onMessage.addListener(
  function(requestMsg, sender, sendResponse) {
    console.log('pop received:', requestMsg)
    if(requestMsg === "heartbeat msg") {
      console.log("pop heartbeat");
    }
    if (sendResponse) {
      sendResponse("pop back!");
    }
  }
);

// popup 打开后，background 可以直接调 background 的方法，两者可以互相调
function popheart(msgfromb) {
  console.log("popheart:", msgfromb)
}
