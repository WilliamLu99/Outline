chrome.storage.local.get(['url'], function (urlObject) {
  outline_dom(urlObject['url']);
  chrome.storage.local.remove('url');
});

function outline_dom(source_input) {
  source = document.getElementById('source');
  source.value = source_input;
  submit_button = document.getElementsByTagName("button")[0];
  submit_button.click();
}
