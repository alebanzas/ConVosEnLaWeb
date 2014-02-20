﻿(function () {
    "use strict";

    var nav = WinJS.Navigation;
    
    WinJS.UI.Pages.define("/pages/docentes/docentes.html", {
        ready: function (element, options) {
            var amenazas = document.getElementById("amenazas");
            var consejos = document.getElementById("consejos");
            var glosario = document.getElementById("glosario");
            var guias = document.getElementById("guias");
            var actividades = document.getElementById("actividades");

            amenazas.onclick = function () {
                nav.navigate("/pages/amenazas/amenazas.html?theme=docentes", nav.state);
            };
            consejos.onclick = function () {
                nav.navigate("/pages/consejos/consejos.html?theme=docentes", nav.state);
            };
            glosario.onclick = function () {
                nav.navigate("/pages/glosario/glosario.html?theme=docentes", nav.state);
            };
            guias.onclick = function () {
                nav.navigate("/pages/guias/guias.html?theme=docentes", nav.state);
            };
            actividades.onclick = function () {
                nav.navigate("/pages/actividades/actividades.html?theme=docentes", nav.state);
            };
	        
	        var header = document.querySelector(".docentes header[role=banner]");
	        enterAnimation([header], [amenazas, consejos], [glosario, guias], [actividades]);
	    },
    });

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
