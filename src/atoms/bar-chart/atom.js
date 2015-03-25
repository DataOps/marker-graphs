// ta in json
// instansiera vårt objekt
//

var info = {
	name: "BarChart",
	description: "A barchart by the team"
};

function BarChart(){
	var atom;
	var data;

	// default properties for the Atom
	var defaults = {
		chart:{
			background: "white",
			foreground: "#333"
		},
		lines:{},
		highest:{
			color:"red"
		}
	};

	// called by library
	// onRecieveJSON
	var init = function (json, options, callback){

		data = json;

		if(options){
			//recursively merge defaults with options
			$.extend(true, defaults, options);
		};

		if(callback){
			callback();
		};
	};

	var draw = function (paper) {
		var c = paper.append('circle');

		c.attr({r:100, 'fill':'black'});

	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw
	});
};

Molecule.registerAtom(BarChart, info);



