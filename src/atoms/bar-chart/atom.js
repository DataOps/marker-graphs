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
		},
		barWidth: 50,
		barMargin: 20
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

		var paperHeight = parseInt(paper.attr('height'));

		


		var bars = paper.selectAll('rect')
			.data(data)

		bars.enter()
			.append('rect')
				.attr('width', defaults.barWidth)
				.attr('x', function (d,i) {
					return i * (defaults.barWidth + defaults.barMargin);
				})
				.attr('y', function (d) {
					return paperHeight - d.value;
				})
				.attr('height', function (d) {
					return d.value;
				})
				.attr('fill', '#dd7777')



	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw
	});
};

Molecule.registerAtom(BarChart, info);


