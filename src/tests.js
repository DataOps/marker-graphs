function tests () {
	var atoms = Molecule.getAtoms();

	function scatterchart (paper) {
		var sp = atoms['ScatterPlot'];
		sp = sp()

		sp.init([
			{label:"value1", "x":30, "y":40},
			{label:"value2", "x":50, "y":10},
			{label:"value3", "x":10, "y":140},
			{label:"value3", "x":10, "y":120},
			{label:"value3", "x":50, "y":130},
			{label:"value3", "x":70, "y":140},
			{label:"value3", "x":60, "y":140},
			{label:"value3", "x":20, "y":170},
			{label:"value3", "x":13, "y":130},
			{label:"value4", "x":80, "y":80}
		]);

		sp.draw(paper);
	}

	function scatter3dchart (paper) {
		var sp = atoms['ScatterPlot3d'];
		sp = sp();

		sp.init([
			{label:"value1", "x":30, "y":40, "z":40},
			{label:"value2", "x":50, "y":10, "z":20},
			{label:"value3", "x":10, "y":140, "z":10},
			{label:"value3", "x":10, "y":120, "z":40},
			{label:"value3", "x":50, "y":130, "z":60},
			{label:"value3", "x":70, "y":140, "z":70},
			{label:"value3", "x":60, "y":140, "z":40},
			{label:"value3", "x":20, "y":170, "z":50},
			{label:"value3", "x":13, "y":130, "z":80},
			{label:"value4", "x":80, "y":80, "z":40}
		]);

		sp.draw(paper);
	};

	function barchart (paper) {	
		var bc = atoms['BarChart'];
		bc = bc()

		bc.init([
			{label:"BallaKjelli", "value":150},
			{label:"Bengt", "value":10},
			{label:"Jimmy", "value":30},
			{label:"Morhaf", "value":40},
			{label:"John", "value":30},
			{label:"Patrik", "value":150},
			{label:"Oscar", "value":100},
			{label:"David", "value":80}
		],{title:"Who rules tha most?"});

		bc.draw(paper);
	};

	function worldchart (paper) {
		// worldchart
		var wc = atoms['worldchart'];
		wc = wc();

		wc.init([
			{SWE: 400},
			{USA: 200},
			{NOR: 100}
		]);

		wc.draw(paper);
	}

	function chordchart (paper) {
		// worldchart
		var cc = atoms['ChordChart'];
		cc = cc();

		cc.init({
			"David": {
				"John": 10,
				"Patrik": 10
			},
			"John" : {
				"John": 10,
				"Patrik": 20,
				"David": 20
			},
			"Patrik" : {
				"John": 10,
				"Patrik": 20,
				"David": 10
			}
		});

		cc.draw(paper);
	}

	function linechart (paper) {
		var sp = atoms['LineChart'];
		sp = sp();


		var lines = [];
		for (var i = 0; i < 4; i++) {
			var vals = [];
			for (var j = 0; j < 8; j++) {
				vals.push(Math.random() * 600)
			};
			lines.push({label: "line-"+i, values:vals});
		};

		sp.init(lines);
		sp.draw(paper);
	};

	var draw = function (graphs) {
		for (var i = 0; i < graphs.length; i++) {
			var pap = d3.select('.container').append('svg')
				.attr('width', (graphs.length == 1 ? document.width - 40 : (document.width - 80)/2))
				.attr('height', (graphs.length == 1 ? 800 : 400));

			var g = graphs[i];
			g(pap);
		};
	}

	// draw([scatter3dchart, scatterchart, barchart, linechart, worldchart]);
	draw([chordchart]);




};



tests();