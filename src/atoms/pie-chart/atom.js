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
		margin:{
			top: 100,
			bottom: 100
		},
		chart:{
			background: "white",
			foreground: "#333"
		},
		fills: [
			"#3FB8AF",
			"#FF3D7F",
			"#E0E4CC",
			"#DAD8A7",
			"#FA6900",
			"#A7DBD8",
			"#F38630",
			"#69D2E7",
			"#7FC7AF",
			"#FF9E9D"
		],
		getFill: function (index) {
			return this.fills[index % this.fills.length]
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

		var paperHeight = parseInt(paper.attr('height'));
		var paperWidth = parseInt(paper.attr('width'));


		var radius = (Math.min(paperHeight, paperWidth)-defaults.margin.top - defaults.margin.bottom) / 2;

		paper.append('rect')
			.attr('width', paperWidth)
			.attr('height', paperHeight)
			.attr('fill', "#fafafa")
			.attr('stroke', "rgba(0,0,0,0.4)")

		// paper = paper.append('g')
		// 	.attr('transform', 'translate(' + (defaults.margin.top/2) + ',' + (defaults.margin.left/2) + ')')

		
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
			.style("fill", function(d,i) {
				var rgb =  d3.rgb(defaults.getFill(i));
				return 'rgba(' + rgb.r+','+ rgb.g+','+rgb.b +','+ 0.7 +')';
			})
			.style("stroke-width", 1)
			.style("stroke", function(d,i) { return d3.rgb(defaults.getFill(i)).darker(); })
			.attr("transform", "translate(" + (paperWidth/2) + "," + (radius + defaults.margin.top) + ")"); // move in cavas

 		  var t = slices.enter().append("g")
 		  	.attr("transform", "translate(" + (paperWidth/2) + "," + (radius + defaults.margin.top) + ")"); // move in cavas

 		  t.append("text")
 		  		// calculate text angle
				.each(function(d) {
					d.angle = (d.startAngle + d.endAngle) / 2;
				})

				.attr("font-family", "avenir")
				.attr("fill", function (d,i) {
					return d3.rgb(defaults.getFill(i)).darker();
				})
				.attr("stroke", function (d,i) {
					return d3.rgb(defaults.getFill(i)).darker();
				})
				.attr("stroke-width", "0.2")
				.attr("font-weight", "600")

				.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
				.text(function(d,i) {return d.data.label;})
				.attr("transform", function(d) {
					return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
					    + "translate(" + ( 26) + ")"
					    + (d.angle > Math.PI ? "rotate(180)" : "");
				})
				.transition()

				.attr("transform", function(d) {
					return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
					    + "translate(" + (radius + 26) + ")"
					    + (d.angle > Math.PI ? "rotate(180)" : "");
				})

	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}
	});
};

Molecule.registerAtom(PieChart, info);
