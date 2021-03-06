﻿(function () {
    "use strict";

    var nav = WinJS.Navigation;
    
    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            var ninos = document.getElementById("ninos");
            var adolescentes = document.getElementById("adolescentes");
            var padres = document.getElementById("padres");
            var docentes = document.getElementById("docentes");
            var presentacion = document.getElementById("presentacion");
            var quienes = document.getElementById("quienes");
            var video = document.getElementById("video");
        	
	        ninos.onclick = function () {
	            nav.navigate("/pages/ninos/ninos.html", nav.state);
            };
	        adolescentes.onclick = function () {
	            nav.navigate("/pages/adolescentes/adolescentes.html", nav.state);
            };
	        padres.onclick = function () {
	            nav.navigate("/pages/padres/padres.html", nav.state);
	        };
	        docentes.onclick = function () {
	            nav.navigate("/pages/docentes/docentes.html", nav.state);
	        };
	        quienes.onclick = function () {
	            WinJS.UI.SettingsFlyout.showSettings("about", "/pages/quienes/quienes.html");
	        };

            video.play();


	        var header = document.querySelector(".homepage header[role=banner]");
	        enterAnimation([header], [ninos, padres], [adolescentes, docentes], [presentacion, quienes]);
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
