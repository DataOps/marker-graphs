// ta in json
// instansiera vårt objekt
//

var info = {
	name: "ChordChart",
	description: "A ChordChart by the team"
};

function BarChart(){
	var atom;
	var data;

	// default properties for the Atom
	var defaults = {
		dataPadding: 0.04,
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

	var dataObjectToMatrix  = function (dat) {
			var matrix = [];
			var implicitOrder = {};
			var i = 0;
			for(var actor in dat){
				implicitOrder[actor] = i;
				
				i++;
			};

			var size = i;

			for(var actor in dat){
				// matrix.push(new Array(size));
				matrix.push(Array.apply(null, new Array(size)).map(Number.prototype.valueOf,0));
				for(var relation in dat[actor]){
					matrix[implicitOrder[actor]][implicitOrder[relation]] = dat[actor][relation];
				};
			};


			i = 0;
			defaults.dataOrder = new Array(size);
			for(var actor in dat){
				defaults.dataOrder[i] = actor;
				i++;
			};

			return matrix;

	};

	var draw = function (paper) {

		

		var paperHeight = parseInt(paper.attr('height'));
		var paperWidth = parseInt(paper.attr('width'));


 		var outerRadius = (paperHeight*.8) / 2,
 		    innerRadius = outerRadius - 30;

		//  frame
		paper.append('rect')
			.attr('width', paperWidth)
			.attr('height', paperHeight)
			.attr('fill', "#fafafa")
			.attr('stroke', "rgba(0,0,0,0.4)")

		var chord = d3.layout.chord()
			.padding(defaults.dataPadding);

		chord.matrix(dataObjectToMatrix(data));
		// chord.matrix(
		// 	[[2,  2, 2],
 	// 		[ 5, 0, 0],
 	// 		[ 5, 0, 0]]
 	// 	);


 		var arc = d3.svg.arc()
 		    .innerRadius(innerRadius)
 		    .outerRadius(innerRadius + 20);

 		paper = paper.append('g')
	 		.attr('transform', 'translate(' + (paperWidth/2) + ',' + (paperHeight/2) + ')')



 		var g = paper.selectAll(".group")
 		      .data(chord.groups)
 		    .enter().append("g")
 		      .attr("class", "group");

 		  g.append("path")
 		      .style("fill", function(d) { return defaults.getFill(d.index); })
 		      .style("stroke", function(d) { return defaults.getFill(d.index); })
 		      .attr("d", arc);

 		  g.append("text")
 		  		// calculate text angle
				.each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
				.attr("dy", ".35em")
				.attr("font-family", "avenir")
				.attr("fill", function (d,i) {
					return defaults.getFill(i);
				})
				.attr("stroke", function (d,i) {
					return d3.rgb(defaults.getFill(i)).darker();
				})
				.attr("stroke-width", "0.2")
				.attr("font-weight", "600")

				.attr("transform", function(d) {
					return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
					    + "translate(" + (innerRadius + 26) + ")"
					    + (d.angle > Math.PI ? "rotate(180)" : "");
				})
				.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
				.text(function(d,i) {return defaults.dataOrder[i]});

 		  paper.selectAll(".chord")
 		      .data(chord.chords)
 		    .enter().append("path")
 		      .attr("class", "chord")
 		      .style("stroke", function(d) {return d3.rgb(defaults.getFill(d.source.index)).darker(); })
 		      .style("fill", function(d) {
 		      	var rgb =  d3.rgb(defaults.getFill(d.source.index));
 		      	return 'rgba(' + rgb.r+','+ rgb.g+','+rgb.b +','+ 0.5 +')';
 		      })
 		      .attr("d", d3.svg.chord().radius(innerRadius));

	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}
	});
};

Molecule.registerAtom(BarChart, info);



