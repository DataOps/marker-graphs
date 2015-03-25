// ta in json
// instansiera vårt objekt
//

var info = {
	name: "ScatterPlot",
	description: "A scatter plot by the team"
};

function ScatterPlot(){
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
		barMargin: 20,
		labelSize: 20
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

		var margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

		// setup x 
		var xValue = function(d) { return d.x;}, // data -> value
			xScale = d3.scale.linear().range([0, width]), // value -> display
			xMap = function(d) { return xScale(xValue(d));}, // data -> display
			xAxis = d3.svg.axis().scale(xScale).orient("bottom");

		// setup y
		var yValue = function(d) { return d.y;}, // data -> value
			yScale = d3.scale.linear().range([height, 0]), // value -> display
			yMap = function(d) { return yScale(yValue(d));}, // data -> display
			yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = paper
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// don't want dots overlapping axis, so add in buffer to data domain
		xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
		yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

		// x-axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
		.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text("X axis");

		// y-axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Y axis");

		svg.selectAll(".dot")
			.data(data)
		.enter().append("circle")
			.attr("class", "dot")
			.attr("r", 3.5)
			.attr("cx", xMap)
			.attr("cy", yMap)
			.style("fill", 'black'); 



	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw
	});
};

Molecule.registerAtom(ScatterPlot, info);



