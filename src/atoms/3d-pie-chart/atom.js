// ta in json
// instansiera vårt objekt
//

var info = {
	name: "3dPieChart",
	description: "A 3d pie chart by the team"
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

		var radius = 200;
		var depth = 30;


		

		
		var pie = d3.layout.pie();
		pie.value(function(d){return d.value;});

		var arc = d3.svg.arc()
			.outerRadius(radius);

		// // select paths, use arc generator to draw
		var slices = paper.selectAll('.slice')
			.data(pie(data));

		for (var i = 0; i < depth; i++) {
			var g = slices.enter()
				.append("g");
			g.append("path")
				.attr("d", arc)
				.attr('stroke', 'rgba(0,0,0,0.1)')
				.style("fill", function(d,count) {
					var color = {r:200 + count*20,g:90+count*20,b:90+count*20};

					if(i != depth -1){
						color.r -= 50;
						color.g -= 50;
						color.b -= 50;
					}

					return 'rgb('+color.r+','+color.g+','+color.b+')';

				})
				.attr("transform", "translate(" + radius + "," + (radius+depth-i) + ")") // move in cavas
				// .on('mouseover', function  () {
				// 	d3.select(this).attr('fill', 'white');
				// })
			g.attr('style', '-webkit-transform: rotateX(60deg);');
		};




	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}
	});
};

Molecule.registerAtom(PieChart, info);
