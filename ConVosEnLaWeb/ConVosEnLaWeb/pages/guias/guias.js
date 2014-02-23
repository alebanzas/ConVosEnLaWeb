(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var theme;

    WinJS.UI.Pages.define("/pages/guias/guias.html", {
        ready: function (element, options) {
            theme = options.theme;
            WinJS.Utilities.addClass(document.getElementsByTagName("body")[0], theme);

            var guia1 = document.getElementById("guia1");
            var guia2 = document.getElementById("guia2");
            var guia3 = document.getElementById("guia3");
            var guia4 = document.getElementById("guia4");
            var descripcion = document.getElementById("descripcion");

            guia1.onclick = function () {
                openFile("files\\guiacyberbullying.pdf");
            };
            guia2.onclick = function () {
                openFile("files\\glosariopadres.pdf");
            };
            guia3.onclick = function () {
                openFile("files\\guiadeamenazas.pdf");
            };
            guia4.onclick = function () {
                openFile("files\\seguridadwifi.pdf");
            };

            var header = document.querySelector(".guias header[role=banner]");
            enterAnimation([header], [guia1, guia3], [guia2, guia4], [descripcion]);
        },

        unload: function () {
            WinJS.Utilities.removeClass(document.getElementsByTagName("body")[0], theme);
        },
    });

    function openFile(fileToLaunch) {

        Windows.ApplicationModel.Package.current.installedLocation.getFileAsync(fileToLaunch).done(
            function (file) {
                var options = new Windows.System.LauncherOptions();
                options.displayApplicationPicker = false;

                Windows.System.Launcher.launchFileAsync(file, options).done(
                    function (success) {
                        if (success) {
                            WinJS.log && WinJS.log("File " + file.name + " launched.", "sample", "status");
                        } else {
                            WinJS.log && WinJS.log("File launch failed.", "sample", "error");
                        }
                    });
            });
    }

    function enterAnimation(grupo1, grupo2, grupo3, grupo4) {
        var contenthost = document.getElementById("contenthost");
        contenthost.style.overflow = "hidden";

        WinJS.UI.Animation.enterPage([grupo1, grupo2, grupo3, grupo4], null).done(
            function () {
                contenthost.style.overflow = "auto";
            });
    }

    function onPointerDown(evt) {
        WinJS.UI.Animation.pointerDown(evt.srcElement);
    }

    function onPointerUp(evt) {
        WinJS.UI.Animation.pointerUp(evt.srcElement);
    }


})();
