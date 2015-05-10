// ta in json
// instansiera vårt objekt
//

var info = {
	name: "LineChart",
	description: "A scatter plot by the team"
};

function ScatterPlot(){
	var atom;
	var data;

	// default properties for the Atom
	var defaults = {
		lineWidth: 3,
		dotRadius: 5,
		dotColor: "#000000",
		margin: {
			top: 20,
			left: 80,
			bottom: 20
		},
		fills: [
			"#69D2E7",
			"#A7DBD8",
			"#E0E4CC",
			"#F38630",
			"#FA6900",
			"#3FB8AF",
			"#7FC7AF",
			"#DAD8A7",
			"#FF9E9D",
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

		var yScale =  (paperHeight- defaults.margin.top - defaults.margin.bottom) / highest;


		//  frame
		paper.append('rect')
			.attr('width', paperWidth)
			.attr('height', paperHeight)
			.attr('fill', "#fafafa")
			.attr('stroke', "rgba(0,0,0,0.4)");

		for (var lineNr = 0; lineNr < data.length; lineNr++) {
			
			// lines
			paper.selectAll(".line-"+lineNr)
				.data(data[lineNr].values)
				.enter()
					.append("line")
						.attr("class", "line")
						.attr('x1', function (d,i) {
							if(i > 0){
								return (i - 1) * tickSpace + defaults.margin.left;
							}
						})
						.attr('x2', function (d,i) {
							if(i > 0){
								return i * tickSpace + defaults.margin.left;
							}
						})
						.attr("y1", function (d,i) {
							if(i > 0){
								 return paperHeight - data[lineNr].values[i-1] * yScale - + defaults.margin.bottom;
							}
						})
						.attr("y2", function (d,i) {
							if(i > 0){
								return paperHeight - d * yScale - + defaults.margin.bottom;
							}
						})

						.attr("stroke",defaults.getFill(lineNr))
						.attr('stroke-width', defaults.lineWidth)
						.attr("r", defaults.dotRadius)

			// dots
			paper.selectAll(".dot-"+lineNr)
				.data(data[lineNr].values)
				.enter()
					.append("circle")
						.attr("class", "dot")
						.style("fill", defaults.getFill(lineNr))
						.attr("r", defaults.dotRadius)
						.attr("cx", function (d,i) {
							return i * tickSpace + defaults.margin.left;
						})
						.attr("cy", function (d) {
							return paperHeight - d * yScale - + defaults.margin.bottom;
						});

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

Molecule.registerAtom(ScatterPlot, info);
