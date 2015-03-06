// ta in json
// instansiera vårt objekt
//

var info = {
	name: "PieChart",
	description: "A pie chart by the team"
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

	var draw = function (paper) {

		var radius = 100;

		// paper.data([data])
		// 	.attr("transform", "translate(" + radius + "," + radius + ")"); // move in cavas

		// // var pie = d3.layout.pie([data]);

		// var pie = d3.layout.pie([1,2,4]);
		// 	// .value(function(d){return d.value;});

		// 	// .data([data])

		// // pie.value(function(d){return d.value;});

		// var arc = d3.svg.arc().outerRadius(radius);


		// // select paths, use arc generator to draw
		// paper.selectAll('.asd').enter()
		// 	.data(pie)




		paper.append('circle')
			.attr('r', radius)
			.attr('cx', 100)
			.attr('cy', 100)
			.attr('fill', "#333");
	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw
	});
};

Molecule.registerAtom(PieChart, info);
