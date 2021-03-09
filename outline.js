chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  if (command === 'open_outline') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      tab = tabs[0];
      id = tab.id;
      url = tab.url;
      console.log(url);
      chrome.tabs.update(id, {url: 'https://outline.com/'}, function() {

        listener = function(tabId, changeInfo, tab) {
          if (tabId == tab.id && changeInfo.status === 'complete') {
            chrome.storage.local.set({
              url: url
            }, function() {
              chrome.tabs.executeScript(id, {
                file: 'outline_dom.js'
              });
            });
            chrome.tabs.onUpdated.removeListener(listener)
          }
        }
        chrome.tabs.onUpdated.addListener(listener)
      });
    });
  }
});
