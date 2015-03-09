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

		

		
		var pie = d3.layout.pie();
		pie.value(function(d){return d.value;});

		var arc = d3.svg.arc()
			.outerRadius(radius);



		// // select paths, use arc generator to draw
		var slices = paper.selectAll('.slice')
			.data(pie(data));


		var g = slices.enter()
			.append("g");

		 g.append("path")
			.attr("d", arc)
			.style("fill", function(d,i) { return "#" + (111*i); })
			.attr("transform", "translate(" + radius + "," + radius + ")"); // move in cavas


	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw
	});
};

Molecule.registerAtom(PieChart, info);
