	// function barchart (paper) {	
	// 	var bc = atoms['BarChart'];
	// 	bc = bc();

	// 	bc.init([
	// 		{label:"BallaKjelli", "value":150},
	// 		{label:"Bengt", "value":10},
	// 		{label:"Jimmy", "value":30},
	// 		{label:"Morhaf", "value":40},
	// 		{label:"John", "value":30},
	// 		{label:"Patrik", "value":150},
	// 		{label:"Oscar", "value":100},
	// 		{label:"David", "value":80}
	// 	],{title:"Who rules tha most?"});

	// 	bc.draw(paper);
	// };

var info = {
	name: "Venn-diagram",
	description: "A 2 or 3 big Venn-diagram by the team"
};

function VennDiagram(){
	var atom;
	var data;

	var joinAll = [];
	var joinAB = [];
	var joinAC = [];
	var joinBC = [];	

	// default properties for the Atom
	var defaults = {
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
		color: ["#A7DBD8","#F38630","#FF3D7F"],
		topMargin: 0,
		radius: 80,
		labelSize: 14,
		opacity: 0.3	
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

	var joinArrays = function () {
		var dataSet = [];
		for(var i = 0; i < data.length; i++) {
			if (!isNaN(data[i].value)) {
				dataSet.push(parseInt(data[i].value,10));
			} else {
				dataSet.push(data[i].value);
			}
		}

		// Join AB
		for (var i = 0; i < dataSet[0].length; i++) {
			if (dataSet[1].indexOf(dataSet[0][i]) !== -1) {
				joinAB.push(dataSet[0][i]);
			}
		}

		// Join BC
		for (var i = 0; i < dataSet[1].length; i++) {
			if (dataSet[2].indexOf(dataSet[1][i]) !== -1) {
			  	joinBC.push(dataSet[1][i]);
			}
		}

		// Join AC
		for (var i = 0; i < dataSet[2].length; i++) {
			if (dataSet[0].indexOf(dataSet[2][i]) !== -1) {
			  	joinAC.push(dataSet[2][i]);
			}
		}

		// Join All (AB) with BC
		for (var i = 0; i < joinAB.length; i++) {
			if (joinBC.indexOf(joinAB[i]) !== -1) {
			  	joinAll.push(joinAB[i]);
			}
		}		
	}

	var draw = function (paper) {
		var paperHeight = parseInt(paper.attr('height'));
		var paperWidth = parseInt(paper.attr('width'));

		var xMid = paperWidth*0.5;
		var yMid = paperHeight*0.5;

		var x1 = xMid - defaults.radius*0.5;
		var x2 = xMid + defaults.radius*0.5;

		var y1 = yMid + defaults.topMargin + 25;
		var y2 = yMid - defaults.radius + defaults.topMargin + 25;

		//  frame
		paper.append('rect')
			.attr('width', paperWidth)
			.attr('height', paperHeight)
			.attr('fill', "#fafafa")
			.attr('stroke', "rgba(0,0,0,0.4)");

		var tooltip = d3.select("body")
			.append("div")
			.style("position", "absolute")
			.style("z-index", "10")
			.style("visibility", "hidden")
			.style("font-family", "avenir")
			.style("font-size", defaults.labelSize*2	)
			.style('color', "#555");


		var vennDiagram = paper.selectAll('g')
			.data(data)		

		if (data.length == 2) {
			// Draw two bubbles
			vennDiagram.enter()
				.append('circle')
					.attr("r", defaults.radius)
					.attr("cx", x1)
					.attr("cy", y1)
					.style({"fill": defaults.color[0], "opacity": defaults.opacity});

			vennDiagram.enter()
				.append('circle')
					.attr("r", defaults.radius)
					.attr("cx", x2)
					.attr("cy", y1)
					.style({"fill": defaults.color[2], "opacity": defaults.opacity});

		} else if (data.length == 3) {
			joinArrays();

			// Draw three bubbles
			vennDiagram.enter()
				.append('circle')
					.attr("r", defaults.radius)
					.attr("cx", x1)
					.attr("cy", y1)
					.style({"fill": defaults.color[0], "opacity": defaults.opacity});

			vennDiagram.enter()
				.append('circle')
					.attr("r", defaults.radius)
					.attr("cx", xMid)
					.attr("cy", y2)
					.style({"fill": defaults.color[1], "opacity": defaults.opacity})

			vennDiagram.enter()
				.append('circle')
					.attr("r", defaults.radius)
					.attr("cx", x2)
					.attr("cy", y1)
					.style({"fill": defaults.color[2], "opacity": defaults.opacity});

			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid+xMid*0.5)
					.attr('y', function (d,i) {
						return yMid - 70 + 50*i;
					})
					.attr("width", 20)
					.attr("height", 20)	
					.attr("fill", function (d,i) {return defaults.color[i]; })
					.style({"opacity": defaults.opacity + 0.4});

			// Join ALL
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*0 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[0], "opacity": defaults.opacity});
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*0 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[1], "opacity": defaults.opacity});
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*0 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[2], "opacity": defaults.opacity});

			// title
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid*0.5)
				.attr('y', yMid - 95 - defaults.labelSize*0.5 + 50*0)
				.text(data[0].label + " \u2229 " + data[1].label + " \u2229 " + data[2].label)
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")

			// Data text
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid*0.5 + 30)
				.attr('y', yMid - 73 - defaults.labelSize*0.5 + 50*0)
				.text(joinAll)
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")				
			// End of join ALL


			// Join A & B
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*1 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[0], "opacity": defaults.opacity});
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*1 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[1], "opacity": defaults.opacity});

			// title
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid*0.5)
				.attr('y', yMid - 95 - defaults.labelSize*0.5 + 50*1)
				.text(data[0].label + " \u2229 " + data[1].label)
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")

			// Data text
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid*0.5 + 30)
				.attr('y', yMid - 73 - defaults.labelSize*0.5 + 50*1)
				.text(joinAB)
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")
			// End of join A & B

			// Join A & C
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*2 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[0], "opacity": defaults.opacity});
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*2 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[2], "opacity": defaults.opacity});

			// title
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid*0.5)
				.attr('y', yMid - 95 - defaults.labelSize*0.5 + 50*2)
				.text(data[0].label + " \u2229 " + data[2].label)
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")

			// Data text
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid*0.5 + 30)
				.attr('y', yMid - 73 - defaults.labelSize*0.5 + 50*2)
				.text(joinAC)
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")
			// End of join A & C

			// Join B & C
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*3 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[1], "opacity": defaults.opacity});
			vennDiagram.enter()
				.append("rect")
					.attr("x", xMid*0.5)
					.attr('y', yMid - 70 + 50*3 - 25)
					.attr("width", 20)
					.attr("height", 20)
					.style({"fill": defaults.color[2], "opacity": defaults.opacity});

			// title
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid*0.5)
				.attr('y', yMid - 95 - defaults.labelSize*0.5 + 50*3)
				.text(data[1].label + " \u2229 " + data[2].label)
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")

			// Data text
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid*0.5 + 30)
				.attr('y', yMid - 73 - defaults.labelSize*0.5 + 50*3)
				.text(joinBC)
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")
			// End of join B & C



			// Data title
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid+xMid*0.5)
				.attr('y', function (d,i) {
					return yMid - 70 - defaults.labelSize*0.5 + 50*i;
				})
				.text(function (d) {
					return d.label;
				})
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#777")

			// Data text
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid+xMid*0.5+30)
				.attr('y', function (d,i) {
					return yMid - 48 - defaults.labelSize*0.5 + 50*i;
				})
				.text(function (d) {
					return d.value;
				})
				.attr("font-family", "avenir")
				.attr("font-size", "14px")
				// .attr("text-anchor", "middle")
				.attr('fill', "#999")

			// Fake area A
			vennDiagram.enter()
				.append('rect')
					.attr("x", x1-65)
					.attr('y', y1-45)
					.attr("width", 55)
					.attr("height", 90)
					.style({"fill": "black", "opacity": 0.0})
					.attr("transform", "rotate(-30, "+x1+","+y1+")")
					.on("mouseover", function(){
						tooltip.text(data[0].value);
						tooltip.style("visibility", "visible");
					})
					.on("mousemove", function(){return tooltip.style("top",
						(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
					.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

			// Fake area B
			vennDiagram.enter()
				.append('rect')
					.attr("x", x1)
					.attr('y', y1-150)
					.attr("width", 80)
					.attr("height", 70)
					.style({"fill": "black", "opacity": 0.0})
					.on("mouseover", function(){
						tooltip.text(data[1].value);
						tooltip.style("visibility", "visible");
					})
					.on("mousemove", function(){return tooltip.style("top",
						(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
					.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

			// Fake area C
			vennDiagram.enter()
				.append('rect')
					.attr("x", x1+80)
					.attr('y', y1-90)
					.attr("width", 50)
					.attr("height", 100)
					.style({"fill": "black", "opacity": 0.0})
					.attr("transform", "rotate(30, "+x1+","+y1+")")
					.on("mouseover", function(){
						tooltip.text(data[2].value);
						tooltip.style("visibility", "visible");
					})
					.on("mousemove", function(){return tooltip.style("top",
						(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
					.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

			// Fake area ABC
			vennDiagram.enter()
				.append('rect')
					.attr("x", x1+18)
					.attr('y', y1-50)
					.attr("width", 45)
					.attr("height", 45)
					.style({"fill": "black", "opacity": 0.0})
					.on("mouseover", function(){
						tooltip.text(joinAll);
						tooltip.style("visibility", "visible");
					})
					.on("mousemove", function(){return tooltip.style("top",
						(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
					.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

			// Fake area AC
			vennDiagram.enter()
				.append('rect')
					.attr("x", x1+18)
					.attr('y', y1)
					.attr("width", 45)
					.attr("height", 50)
					.style({"fill": "black", "opacity": 0.0})
					.on("mouseover", function(){
						tooltip.text(joinAC);
						tooltip.style("visibility", "visible");
					})
					.on("mousemove", function(){return tooltip.style("top",
						(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
					.on("mouseout", function(){return tooltip.style("visibility", "hidden");});					

			// Fake area AB
			vennDiagram.enter()
				.append('rect')
					.attr("x", x1+20)
					.attr('y', y1-60)
					.attr("width", 35)
					.attr("height", 45)
					.style({"fill": "black", "opacity": 0.0})
					.attr("transform", "rotate(-55, "+x1+","+y1+")")
					.on("mouseover", function(){
						tooltip.text(joinAB);
						tooltip.style("visibility", "visible");
					})
					.on("mousemove", function(){return tooltip.style("top",
						(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
					.on("mouseout", function(){return tooltip.style("visibility", "hidden");});					

			// Fake area BC
			vennDiagram.enter()
				.append('rect')
					.attr("x", x1+80)
					.attr('y', y1-15)
					.attr("width", 40)
					.attr("height", 45)
					.style({"fill": "black", "opacity": 0.0})
					.attr("transform", "rotate(-35, "+x1+","+y1+")")
					.on("mouseover", function(){
						tooltip.text(joinBC);
						tooltip.style("visibility", "visible");
					})
					.on("mousemove", function(){return tooltip.style("top",
						(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
					.on("mouseout", function(){return tooltip.style("visibility", "hidden");});					
		}

		if(defaults.title){
			vennDiagram.enter()
				.append("text")
				.attr("x", xMid)
				.attr("y", defaults.topMargin + 40)
				.text(defaults.title)
				.attr("font-family", "avenir")
				.attr("font-size", defaults.labelSize*2	)
				.attr("text-anchor", "middle")
				.attr('fill', "#999")			
		};
	};
		// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}
	});	
};

Molecule.registerAtom(VennDiagram, info);