const {Cc, Ci, Cr, Cu} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");
var PrefServ = require("./PrefServ"),
actionButton = require("./ActionButton"),
Notifications = require("./Notifications"),
Observer =
{
	observe: function(subject, topic, data)
	{
		if (topic == "http-on-modify-request") {
			var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
			var url = httpChannel.URI.spec;
		
			//check if addon is enabled
			if(PrefServ.getter("extensions.jid1-v8zuVDTZ873mAQ@jetpack.enabled") ===  true){

				//check if url is a https url
				if (url.substr(0,8) != "https://"){
					
					//block request
					httpChannel.cancel(Cr.NS_BINDING_ABORTED);
					
					//notify user of blocked url	
					Notifications.sendMsg("Blocked: " + url);
				}
			}

		}

		//Observe preference changes
        if (data === "extensions.jid1-v8zuVDTZ873mAQ@jetpack.enabled"){
    		actionButton.setIconAndLabel();
        }

	},
	get observerService() {
		return Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
	},
    get preferencesService(){
        return Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService);
    }, 
	register: function()
	{
		this.observerService.addObserver(this, "http-on-modify-request", false);
		this.preferencesService.getBranch("").addObserver("",this,false);
	},

	unregister: function()
	{
		this.observerService.removeObserver(this, "http-on-modify-request");
        this.preferencesService.getBranch("").removeObserver("",this);
	}

};

exports.getObserver = function(){
	return Observer;
};

exports.onUnload = function(reason) {
    // Need to remove our observer again! This isn't automatic and will leak
    // otherwise.
	
	Observer.unregister();    
    
	if(reason == "disable" || reason == "uninstall"){
        //restore changes made by addon
        PrefServ.resetter("extensions.jid1-v8zuVDTZ873mAQ@jetpack.enabled");
    }
};
