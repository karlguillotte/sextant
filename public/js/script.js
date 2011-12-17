/* 
	Author: Karl Guillotte
	
*/
// To make sure we do not mess with global variables
(function(d, $, s) {
	var coords = s.geometry.coordinates;
	var po = org.polymaps;
	var map = po.map().center({
		lat: coords[1],
		lon: coords[0]
	}).container(d.getElementById("map").appendChild(po.svg("svg"))).add(po.interact()).add(po.image().url(po.url("http://{S}tile.cloudmade.com" + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
	+ "/998/256/{Z}/{X}/{Y}.png").hosts(["a.", "b.", "c.", ""]))).add(
	po.geoJson().features([sextant]).on("load", function(event) {
		var feature = event.features[0];
		var s = $(feature.element).attr({
			id: feature.data.id,
			r: "7"
		}).mouseover(function() {
			s.qtip("api").show();
		}).mouseout(function() {
			s.qtip("api").hide();
		}).click(function() {
			s.qtip("api").show();
		});
		var tip = s.qtip({
			content: {
				text: feature.data.properties.location
			},
			position: {
				my: "bottom center",
				at: "top center",
				adjust: {
					y: -5
				}
			},
			style: {
				classes: "ui-tooltip-shadow ui-tooltip-rounded ui-tooltip-dark"
			}
		});
	}));
})(document, jQuery, sextant);
// Passing globale variables to speed up...