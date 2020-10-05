 
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-61616161']);
_gaq.push(['_trackPageview']);
 


function onClickHandler(info, tab) {

 let urls = { url:'https://launchpad.support.sap.com/#/solutions/notesv2/?q=' + info.selectionText +'&sortBy=score&sortOrder=desc', no:info.selectionText};
 
 
 
  chrome.tabs.create({ url: urls.url });
 

  
};


chrome.commands.onCommand.addListener(function(command) {

  chrome.storage.local.get("definedURL", function(result){
    if(result.definedURL!=undefined){
      chrome.tabs.update({url:'http://'+result.definedURL});
      _gaq.push(['_trackEvent', 'refresh', result.definedURL]);
    }e
  });
 
  
  
});
chrome.contextMenus.onClicked.addListener(onClickHandler);
// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["selection"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Search '" + context + "' in SAP Notes";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
 
  }
 
});