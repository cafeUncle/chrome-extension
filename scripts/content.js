function cont_p() {
  console.log('pce')
}

console.log(1232)

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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "g_id") {
      console.log("PERFORM AJAX", request.data);
      get_ids()
      sendResponse({ action: "g_id-d" });
    }
  }
);
