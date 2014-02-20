(function () {
    "use strict";

    var nav = WinJS.Navigation;
    
    WinJS.UI.Pages.define("/pages/consejosNinos/consejosNinos.html", {
        ready: function (element, options) {
            var header = document.getElementsByTagName("header")[0];
            header.addClass("ninos");
	    },
    });

})();
