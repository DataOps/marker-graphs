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
		title: "Barchart",
		chart:{
			background: "white",
			foreground: "#333"
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
			return this.fills[index % this.fills.length]
		},
		lines:{},
		highest:{
			color:"red"
		},
		barWidth: 50,
		barMargin: 30,
		topMargin: 120,
		labelSize: 14
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


		var highest = 0;
		data.forEach(function (d) {
			if(d.value > highest) {
				highest = d.value
			};
		});



		var scale = (paperHeight - defaults.topMargin) / highest;
		var xOffsetLeft = defaults.barMargin;

		var barWidth = (paperWidth / data.length) - defaults.barMargin - (defaults.barMargin/data.length);

		//  frame
		paper.append('rect')
			.attr('width', paperWidth)
			.attr('height', paperHeight)
			.attr('fill', "#fafafa")
			.attr('stroke', "rgba(0,0,0,0.4)")





		var bars = paper.selectAll('g')
			.data(data)


		// main bars
		bars.enter()
			.append('rect')
				.attr('width', barWidth)
				.attr('x', function (d,i) {
					return xOffsetLeft + i * (barWidth + defaults.barMargin);
				})
				.attr('fill', function (d,i) {
					return defaults.getFill(i);
				})
				.attr('stroke',"rgba(0,0,0,0.2)")
				// .attr('stroke-width',"2")
				// .attr('stroke-alignment',"inner")
				.attr('y', paperHeight- defaults.labelSize*2)
				.transition()
				.attr('y', function (d) {
					return paperHeight - (d.value * scale) - defaults.labelSize*2;
				})
				.attr('height', function (d) {
					return d.value * scale;
				})
				// .transition()


		shadowSize = (barWidth - barWidth / 1.618);

		//shadows
		bars.enter()
			.append('rect')
				.attr('width', shadowSize)
				.attr('x', function (d,i) {
					return xOffsetLeft + i * (barWidth + defaults.barMargin) + barWidth- shadowSize;
				})
				.attr('fill', 'rgba(0,0,0,0.08)')

				.attr('y', paperHeight- defaults.labelSize*2)
				.transition()
				.attr('height', function (d) {
					return d.value * scale;
				})
				.attr('y', function (d) {
					return paperHeight - (d.value * scale) - defaults.labelSize*2;
				});

		// labels
		bars.enter()
			.append('text')
				.text(function (d) {
					return d.label;
				})
				.attr('x', function (d,i) {
					return xOffsetLeft + i * (barWidth + defaults.barMargin) + barWidth /2;
				})
				.attr('y', function (d) {
					return paperHeight - defaults.labelSize + 5;
				})
				.attr('width', barWidth)
				.attr('stroke-width', ".05")
				.attr('fill', function (d,i) {
					return defaults.getFill(i);
				})
				.attr('stroke',"black")
				.attr('font-family', "avenir")
				.attr('text-anchor', "middle")
				// .attr('style', "text-transform: uppercase;")
				.attr('font-size', "12")
				.attr('font-weight', "600")

		// bars.values
		bars.enter()
			.append('text')
				.text(function (d) {
					return d.value;
				})
				.attr('x', function (d,i) {
					return xOffsetLeft + i * (barWidth + defaults.barMargin) + barWidth /2;
				})
				.attr('width', barWidth)
				.attr('stroke-width', ".05")
				.attr('fill', function (d,i) {
					return defaults.getFill(i);
				})
				.attr('stroke',"black")
				.attr('font-family', "avenir")
				.attr('text-anchor', "middle")
				// .attr('style', "text-transform: uppercase;")
				.attr('font-size', barWidth /3)
				.attr('font-weight', "600")
				.attr('y', paperHeight- defaults.labelSize*2)
				.transition()
				.attr('y', function (d) {
					return paperHeight - (d.value * scale) - defaults.labelSize*2 - defaults.labelSize;
				})


		if(defaults.title){
			bars.enter()
				.append('text')
					.text(defaults.title)
					.attr('x', 10)
					.attr('y', defaults.barMargin  + 5)
					.attr('fill', "#999")
					.attr('font-family', "avenir")
					.attr('font-size', defaults.barMargin*0.9)
		};

	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}
	});
};

Molecule.registerAtom(BarChart, info);



