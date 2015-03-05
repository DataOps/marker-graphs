// ta in json
// instansiera vårt objekt
//

var info = {
	name: "PieChart",
	description: "A pie chart by the team"
};

function PieChart(paper){
	var atom;

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

		console.log("Pie chart initiated");

		if(options){
			//recursively merge defaults with options
			$.extend(true, defaults, options);
		};

		if(callback){
			callback();
		};
	};

	var draw = function () {
		// d3
	};

	return Object.freeze({
		init:init
	});
};

Molecule.registerAtom(PieChart, info);
