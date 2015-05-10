// ta in json
// instansiera vårt objekt
//

var info = {
	name: "ScatterPlot3d",
	description: "A scatter 3d plot by the team"
};

function ScatterPlot(){
	var atom;
	var data;

	// default properties for the Atom
	var defaults = {
		
		dotRadius: 20,
		dotColor: "#000000",
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
			return this.fills[index % this.fills.length]
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

		//  frame
		paper.append('rect')
			.attr('width', paperWidth)
			.attr('height', paperHeight)
			.attr('fill', "#fafafa")
			.attr('stroke', "rgba(0,0,0,0.4)")

		var margin = {top: 20, right: 40, bottom: 40, left: 60};
		var width = paperWidth - margin.right - margin.left; //960 - margin.left - margin.right;
		var height = paperHeight - margin.top - margin.bottom; //500 - margin.top - margin.bottom;

		// setup x
		var xValue = function(d) { return d.x;};
		var xScale = d3.scale.linear().range([0, width]); //set xscale 
		var xMap = function(d) { return xScale(xValue(d));}; //map to datavalue
		var xAxis = d3.svg.axis().scale(xScale).orient("bottom"); //attach scale to visual axis

		// setup y
		var yValue = function(d) { return d.y;}; 
		var yScale = d3.scale.linear().range([height, 0]);
		var yMap = function(d) { return yScale(yValue(d));}; 
		var yAxis = d3.svg.axis().scale(yScale).orient("left");

		// yAxis..attr('font-family', 'avenir')


		var svg = paper
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// don't want dots overlapping axis, so add in buffer to data domain
		xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
		yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

		// dots
		svg.selectAll(".dot")
			.data(data)
			.enter()
				.append("circle")
					.attr("class", "dot")
					.style("fill", function (d,i) {
						return defaults.getFill(i);
					})
					.attr("r", function (d) {
						return d.z;
					})
					.attr("cx", xMap)
					.attr("cy", yMap)

		// x-axis
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.attr('font-family', 'avenir')
			.attr('font-weight', '600')
			.attr('fill', "rgba(0,0,0,0.4)")
			.append("text")
				.attr("x", width)
				.attr("y", -6)
				.style("text-anchor", "end")
				.attr('font-family', 'avenir')
				.text("X axis");

		// y-axis
		svg.append("g")
			.call(yAxis)
			.attr('font-family', 'avenir')
			.attr('font-weight', '600')
			.attr('fill', "rgba(0,0,0,0.4)")

			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Y axis")
				.attr('font-family', 'avenir');

		d3.selectAll('.domain')
			// .attr('fill', "rgba(0,0,0,0.4)")
			.attr('fill','none')
			.attr('stroke','black')
			.attr('stroke-width','1')




	};

	// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}

	});
};

Molecule.registerAtom(ScatterPlot, info);



