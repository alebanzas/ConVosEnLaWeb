(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var theme;
    
    WinJS.UI.Pages.define("/pages/actividades/actividades.html", {
        ready: function (element, options) {
            theme = options.theme;
            WinJS.Utilities.addClass(document.getElementsByTagName("body")[0], theme);

            var actividad1 = document.getElementById("actividad1");
            var actividad2 = document.getElementById("actividad2");
            var actividad3 = document.getElementById("actividad3");
            var actividad4 = document.getElementById("actividad4");
            var descripcion = document.getElementById("descripcion");

            actividad1.onclick = function () {
                openFile("files\\cvelw_actividad_adolescentes3.pdf");
            };
            actividad2.onclick = function () {
                openFile("files\\cvelw_actividad_ninos.pdf");
            };
            actividad3.onclick = function () {
                openFile("files\\cvelw_actividad_adolescentes.pdf");
            };
            actividad4.onclick = function () {
                openFile("files\\cvelw_actividad_ninios3.pdf");
            };
	        
	        var header = document.querySelector(".actividades header[role=banner]");
	        enterAnimation([header], [actividad1, actividad3], [actividad2, actividad4], [descripcion]);
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
                    function(success) {
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
