(function () {
    "use strict";

    var nav = WinJS.Navigation;
    
    WinJS.UI.Pages.define("/pages/adolescentes/adolescentes.html", {
        ready: function (element, options) {
            var amenazas = document.getElementById("amenazas");
            var consejos = document.getElementById("consejos");
            var vacaciones = document.getElementById("vacaciones");
            var presentacion = document.getElementById("presentacion");
        	
	        amenazas.onclick = function () {
	            nav.navigate("/pages/amenazas/amenazas.html?theme=adolescentes", nav.state);
            };
	        consejos.onclick = function () {
	            nav.navigate("/pages/consejos/consejos.html?theme=adolescentes", nav.state);
            };
	        vacaciones.onclick = function () {
	            nav.navigate("/pages/vacaciones/vacaciones.html?theme=adolescentes", nav.state);
	        };
            
	        var header = document.querySelector(".adolescentes header[role=banner]");
	        enterAnimation([header], [amenazas, consejos], [vacaciones], [presentacion]);
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
