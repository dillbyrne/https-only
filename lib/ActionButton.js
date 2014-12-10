var ui = require("sdk/ui"),
    Data = require("./Data"),
    PrefServ = require("./PrefServ"),
    button,
    on_tooltip =  "Https Only Enabled\nClick to disable",
	off_tooltip = "Https Only Disabled\nClick to enable";

exports.init = function(){
  
    button = ui.ActionButton({
        id: "https-only",
        label:on_tooltip,
        icon:{
			"16": Data.get('images/icon_on16.png'),
			"32": Data.get('images/icon_on32.png'),
			"64": Data.get('images/icon_on64.png'),
		},
        onClick:toggleHttpsOnly
    });
	
    //set icon and label to reflect the initial state
    setupIconAndLabel();

};

function toggleHttpsOnly(){
  
	if(PrefServ.getter("extensions.jid1-v8zuVDTZ873mAQ@jetpack.enabled") == true)
		PrefServ.setter("extensions.jid1-v8zuVDTZ873mAQ@jetpack.enabled",false);
  	else
    	PrefServ.setter("extensions.jid1-v8zuVDTZ873mAQ@jetpack.enabled",true);
};



function setupIconAndLabel(){
	if(PrefServ.getter("extensions.jid1-v8zuVDTZ873mAQ@jetpack.enabled") == true){
    	button.label = on_tooltip;
    	button.icon["16"] = Data.get("images/icon_on16.png");   
    	button.icon["32"] = Data.get("images/icon_on32.png");   
    	button.icon["64"] = Data.get("images/icon_on64.png");   
    	button.icon =  Data.get("images/icon_on64.png");  
  	}
  	else{
    	button.label = off_tooltip;
    	button.icon["16"] = Data.get("images/icon_off16.png");   
    	button.icon["32"] = Data.get("images/icon_off32.png");   
    	button.icon["64"] = Data.get("images/icon_off32.png");   
    	button.icon =  Data.get("images/icon_off64.png");  
  	}
};

exports.setIconAndLabel = function(){
	setupIconAndLabel();
};
