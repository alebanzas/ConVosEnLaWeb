(function () {
    "use strict";

    var nav = WinJS.Navigation;
    
    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            var ninos = document.getElementById("ninos");
            var adolescentes = document.getElementById("adolescentes");
            var padres = document.getElementById("padres");
            var docentes = document.getElementById("docentes");
            var presentacion = document.getElementById("presentacion");
        	
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
            
	        //laBombonera.addEventListener("MSPointerDown", onPointerDown, false);
	        //laBombonera.addEventListener("MSPointerUp", onPointerUp, false);
	        //historia.addEventListener("MSPointerDown", onPointerDown, false);
	        //historia.addEventListener("MSPointerUp", onPointerUp, false);
	        //noticias.addEventListener("MSPointerDown", onPointerDown, false);
	        //noticias.addEventListener("MSPointerUp", onPointerUp, false);
	        //comisionDirectiva.addEventListener("MSPointerDown", onPointerDown, false);
	        //comisionDirectiva.addEventListener("MSPointerUp", onPointerUp, false);
	        //historiaEquipos.addEventListener("MSPointerDown", onPointerDown, false);
	        //historiaEquipos.addEventListener("MSPointerUp", onPointerUp, false);
	        //historiaCamisetas.addEventListener("MSPointerDown", onPointerDown, false);
	        //historiaCamisetas.addEventListener("MSPointerUp", onPointerUp, false);
	        //informacionSocios.addEventListener("MSPointerDown", onPointerDown, false);
	        //informacionSocios.addEventListener("MSPointerUp", onPointerUp, false);
	        //redesSociales.addEventListener("MSPointerDown", onPointerDown, false);
	        //redesSociales.addEventListener("MSPointerUp", onPointerUp, false);
	        
	        var header = document.querySelector(".homepage header[role=banner]");
	        enterAnimation([header], [ninos, padres], [adolescentes, docentes], [presentacion]);
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
