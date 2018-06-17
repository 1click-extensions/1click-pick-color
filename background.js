chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}
//console.log(chrome.browserAction.onClicked);
chrome.browserAction.onClicked.addListener(function(tab){
  //console.log('clicke');
   chrome.tabs.query({'active': true},function(curTabs){
      //console.log(curTabs)
      if(curTabs[0] && curTabs[0] && curTabs[0].id){
        //console.log(curTabs[0].id, img);
        //chrome.tabs.sendMessage(curTabs[0].id, {action:'showCover'});
        chrome.tabs.executeScript(null, {file: "js/picker.js"});
        chrome.tabs.insertCSS(null, {file: "css/picker.css"});
    }
  });
 });
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log(request,sender);
    switch(request.action){
      case 'colorPicked':
        chrome.tabs.captureVisibleTab(null,{format:'png'}, function(img){
          

           chrome.tabs.sendMessage(sender.tab.id,{action:'ctx'/*,data:pixelData*/,image:img,data:request.data});
           setTimeout(injectJsCurrentTab,3000);
          //};
          // image.width = (request.data.width /request.data.innerOuterRatioWidth);
          // image.height = (request.data.width /request.data.innerOuterRatioWidth);
         // image.src = img;
          
           })
        break;
      // case 'popupstarted':
      //     chrome.tabs.query({'active': true},function(curTabs){
      //     //console.log(curTabs)
      //     if(curTabs[0] && curTabs[0] && curTabs[0].id){
      //           //console.log(sender);
      //       chrome.tabs.sendMessage(curTabs[0].id, {action:'colorPicked'});
      //       }
      //     });
      //   break;
    }
});