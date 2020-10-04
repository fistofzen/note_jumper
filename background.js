 
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-61616161']);
_gaq.push(['_trackPageview']);

chrome.commands.onCommand.addListener(function(command) {

  chrome.storage.local.get("definedURL", function(result){
    if(result.definedURL!=undefined){
      chrome.tabs.update({url:'http://'+result.definedURL});
      _gaq.push(['_trackEvent', 'refresh', result.definedURL]);
    }else{
   
    }
  });

});