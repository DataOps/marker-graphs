// ta in json
// instansiera vårt objekt
//

var info = {
	name: "worldchart",
	description: "A world chart by the team"
};

function PieChart(){
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
		console.log("Pie chart initiated");


		data = json;

		

		if(options){
			//recursively merge defaults with options
			$.extend(true, defaults, options);
		};

		if(callback){
			callback();
		};
	};

	// https://github.com/markmarkoh/datamaps
	var draw = function (paper) {

		// console.log(paper)
		// var map = new Datamap({element: document.getElementById('container')});
		var map = new Datamap({
			element: paper.node(),
			fills: {
				defaultFill: 'rgb(200,200,200)'
			},
			geographyConfig: {
				highlightFillColor: "rgb(200,90,90)"
			}
		});


	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}
	});
};

Molecule.registerAtom(PieChart, info);