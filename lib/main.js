require("./ActionButton").init();
var chrome = require("./Chrome");
chrome.getObserver().register();

exports.onUnload = function (reason){
    chrome.onUnload(reason);
};

