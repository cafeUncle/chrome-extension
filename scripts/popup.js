


console.log('popup+', 123123)

document.getElementById('get_id').addEventListener('click', function() {
  chrome.runtime.sendMessage({ action: "g_id", data: {"m":"p->b"} }, function(response) {
    if(response && response.action === "g_id—d") {
      console.log("Your bookmark was saved successfully!");
    } else {
      console.log("Sorry, there was an error while saving your bookmark.");
    }
  })

})

console.log('popup+', 11231233231);
