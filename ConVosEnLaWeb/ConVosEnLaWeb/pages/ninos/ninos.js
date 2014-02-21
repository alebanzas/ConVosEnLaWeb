(function () {
    "use strict";

    var nav = WinJS.Navigation;
    
    WinJS.UI.Pages.define("/pages/ninos/ninos.html", {
        ready: function (element, options) {
            var consejos = document.getElementById("consejos");
            var vacaciones = document.getElementById("vacaciones");
            var presentacion = document.getElementById("presentacion");
        	
            consejos.onclick = function () {
	            nav.navigate("/pages/consejosNinos/consejosNinos.html", { theme: "ninos"});
            };
	        vacaciones.onclick = function () {
	            nav.navigate("/pages/vacaciones/vacaciones.html", { theme: "ninos"});
	        };
            
	        var header = document.querySelector(".ninos header[role=banner]");
	        enterAnimation([header], [consejos, vacaciones], [presentacion], []);
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
