(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var theme;
    
    WinJS.UI.Pages.define("/pages/actividades/actividades.html", {
        ready: function (element, options) {
            theme = options.theme;
            WinJS.Utilities.addClass(document.getElementsByTagName("body")[0], theme);
        },

        unload: function () {
            WinJS.Utilities.removeClass(document.getElementsByTagName("body")[0], theme);
        },
    });
})();
