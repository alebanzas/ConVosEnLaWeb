(function () {
    "use strict";

    var nav = WinJS.Navigation;
    
    WinJS.UI.Pages.define("/pages/docentes/docentes.html", {
        ready: function (element, options) {
            var amenazas = document.getElementById("amenazas");
            var consejos = document.getElementById("consejos");
            var glosario = document.getElementById("glosario");
            var guias = document.getElementById("guias");
            var descripcion = document.getElementById("descripcion");
            var actividades = document.getElementById("actividades");

            amenazas.onclick = function () {
                nav.navigate("/pages/splitdata/splitdata.html", { theme: "docentes", data: "amenazas", title: "amenazas" });
            };
            consejos.onclick = function () {
                nav.navigate("/pages/splitdata/splitdata.html", { theme: "docentes", data: "consejos", title: "consejos", template: "itemtemplate2" });
            };
            glosario.onclick = function () {
                nav.navigate("/pages/splitdata/splitdata.html", { theme: "docentes", data: "glosario", title: "glosario", template: "itemtemplate2" });
            };
            guias.onclick = function () {
                nav.navigate("/pages/guias/guias.html", { theme: "docentes" });
            };
            actividades.onclick = function () {
                nav.navigate("/pages/actividades/actividades.html", { theme: "docentes" });
            };
	        
	        var header = document.querySelector(".docentes header[role=banner]");
	        enterAnimation([header], [amenazas, glosario], [consejos, guias], [descripcion, actividades]);
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
