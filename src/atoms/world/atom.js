// ta in json
// instansiera vårt objekt
//

var info = {
	name: "worldchart",
	description: "A world chart by the team"
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

	// https://github.com/markmarkoh/datamaps
	var draw = function (paper) {

		var convertedData = {};
		var paperHeight = parseInt(paper.attr('height'));
		var paperWidth = parseInt(paper.attr('width'));

		data.forEach(function (pair) {
			// only one pair
			for(var k in pair){
				convertedData[k] = {
					fillKey: "LOW",
					val: pair[k]
				}
				break; // ()
			}
		});

		//  frame
		paper.append('rect')
			.attr('width', paperWidth)
			.attr('height', paperHeight)
			.attr('fill', "#fafafa")
			.attr('stroke', "rgba(0,0,0,0.4)")

		// console.log(paper)
		// var map = new Datamap({element: document.getElementById('container')});
		var map = new Datamap({
			element: paper.node(),
			fills: {
				defaultFill: 'rgb(200,200,200)',
				LOW: 'rgb(200,120,90)',
				MEDIUM: 'rgb(200,100,200)',
				HIGH: 'rgb(120,200,200)'
			},
			geographyConfig: {
				highlightFillColor: "rgb(200,90,90)",
				popupTemplate: function(geo, d) {
					if(d){

		                return ['<div class="hoverinfo"><strong>',
		                        'Number of things in ' + geo.properties.name,
		                        ': ' + d.val,
		                        '</strong></div>'].join('');
					}
	            }
			},
			data:convertedData
		});
		map.legend();


	};

		// init:init
	return Object.freeze({
		init: init,
		draw: draw,
		getDefaults: function(){return defaults;}
	});
};

Molecule.registerAtom(PieChart, info);