var Notifications = require("sdk/notifications"),
Data = require("./Data"),
PrefServ = require("./PrefServ");

exports.sendMsg = function(msg){
	//show notifications if selected
	if (PrefServ.getter("extensions.jid1-v8zuVDTZ873mAQ@jetpack.notify") == true ){
		Notifications.notify({
			title:"Https Only",
			text: msg,
			iconURL: Data.get("images/icon.png")
		});
	}
};
