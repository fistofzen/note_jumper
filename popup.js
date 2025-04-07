function message(val) {
  $(".message").text(val);
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
function clearHistory() {

  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error + " x");s
    }sss
  });

  


  
}
var _visitedUrls = _visitedUrls || [];
 
chrome.storage.local.get("definedURL", function (result) {
   
  if (result.definedURL != undefined) {
    for (var i = 0, ie = result.definedURL.length; i < ie; ++i) {
      _visitedUrls.push(result.definedURL[i]);
    }
  }
});
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'SN-61616161']);
_gaq.push(['_trackPageview']);


$(document).ready(function () {
  
  //set input to previously saved value
  chrome.storage.local.get("definedURL", function (result) {
   JSON.stringify(result);
    if (result.definedURL != undefined) {
      var popupDiv = document.getElementById('visitedUrls');
      var ul = document.createElement('ul');
      popupDiv.appendChild(ul);
    
      for (var i = 0, ie = result.definedURL.length; i < ie; ++i) {
        var a = document.createElement('a');
        a.href = result.definedURL[i].url;
      
        a.appendChild(document.createTextNode(result.definedURL[i].no + " - " + result.definedURL[i].url));
        var li = document.createElement('li');
        li.appendChild(a);
        ul.appendChild(li);
      }


      $(".urlinput").attr("placeholder", result.definedURL[0].url);
    } else {
      $(".urlinput").attr("placeholder", "type note number or text here...");
    }
  });

  //handle update
  $(".urlbutton").click(function () { 

    let userEnteredText = $(".urlinput").val();
    let urls = "";
  
    
    if ( isNumber(userEnteredText  )) {
      urls = { url:'https://launchpad.support.sap.com/#/notes/' + userEnteredText, no:userEnteredText};
    }else{
      userEnteredText = decodeURIComponent(decodeURIComponent(decodeURIComponent(userEnteredText)));
      urls = { url:'https://launchpad.support.sap.com/#/solutions/notesv2/?q=' + userEnteredText +'&sortBy=score&sortOrder=desc', no:userEnteredText};
    }
    
    if(_visitedUrls.length > 35){
      _visitedUrls.pop();
    }
    _visitedUrls.unshift(urls);
    
    chrome.storage.local.set({ 'definedURL': _visitedUrls }, function () {
      chrome.tabs.create({ url: urls.url });
    });

  });

  //allow update when enter is pressed
  $('input').keypress(function (e) {
    if (e.which == 13) {
      $(".urlbutton").click();
      return false;
    }
  });
});

