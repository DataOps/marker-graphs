// ta in json
// instansiera vårt objekt
//

var info = {
	name: "AreaChart",
	description: "A scatter plot by the team"
};

function AreaChart(){
	var atom;
	var data;

	// default properties for the Atom
	var defaults = {
		lineWidth: 3,
		dotRadius: 5,
		dotColor: "#000000",
		margin: {
			top: 20,
			left: 60,
			bottom: 20
		},
		fills: [
			"#7FC7AF",
			"#FF9E9D",
			"#69D2E7",
			"#3FB8AF",
			"#A7DBD8",
			"#E0E4CC",
			"#F38630",
			"#FA6900",
			"#DAD8A7",
			"#FF3D7F"
		],
		getFill: function (index) {
			return this.fills[index % (this.fills.length)]
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

		var tickSpace = paperWidth / data[0].values.length;


		// max()
		// var max
		// d3.max(d3.max(data, function () {
			
		// }))
		var maxv = [];
		for (var i = 0; i < data.length; i++) {

			maxv.push(d3.max(data[i].values));
		};

		var highest = d3.max(maxv);

		// var yScale =  (paperHeight/2- defaults.margin.top - defaults.margin.bottom) / highest;
		var yScale =  ((paperHeight/2)-defaults.margin.top) / highest;


		//  frame
		paper.append('rect')
			.attr('width', paperWidth)
			.attr('height', paperHeight)
			.attr('fill', "#fafafa")
			.attr('stroke', "rgba(0,0,0,0.4)");







		for (var lineNr = 0; lineNr < data.length; lineNr++) {
			var size = data[lineNr].values.length;

			var lineGenerator = d3.svg.line()
				.x(function(d,i){
					var a = (i >= size ? (size*2 - i -1 ) : i);

					return a * tickSpace + defaults.margin.left;
				})
				.y(function(d){return (paperHeight/2) + (d*yScale);});
			
			var next = [];
			data[lineNr].values.forEach(function (v) {
				next.push(-v)
			});
			next.reverse();

			data[lineNr].values = data[lineNr].values.concat(next);


			var g = paper.append('path')
				.attr('d', lineGenerator(data[lineNr].values))
				.attr('stroke', function () {
					return d3.rgb(defaults.getFill(lineNr)).darker();
				})
				.attr('fill', function () {
					var rgb =  d3.rgb(defaults.getFill(lineNr));
					return 'rgba(' + rgb.r+','+ rgb.g+','+rgb.b +','+ (1/data.length) +')';
				})

			// yaxis
			paper.append('line')
				.attr('x1', defaults.margin.left)
				.attr('x2', defaults.margin.left)
				.attr('y1', 20)
				.attr('y2', paperHeight-defaults.margin.bottom)
				.attr('stroke', "rgba(0,0,0,0.09)")
			
			// labels
			paper.append('text')
				.text(Math.round(highest))
				.attr('x', defaults.margin.left - 10)
				.attr('y', 25)
				.attr('text-anchor', 'end')
				.attr('font-family', "avenir")
				.attr('font-weight', '600')
				.attr('fill', "rgba(0,0,0,0.09)")

			paper.append('text')
				.text("0")
				.attr('x', defaults.margin.left - 10)
				.attr('text-anchor', 'end')
				.attr('y', paperHeight - defaults.margin.bottom)
				.attr('font-family', "avenir")
				.attr('font-weight', '600')
				.attr('fill', "rgba(0,0,0,0.09)")

		};

		




	};

	// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}

	});
};

Molecule.registerAtom(AreaChart, info);
