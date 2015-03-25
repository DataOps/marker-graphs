function tests () {
	var atoms = Molecule.getAtoms();

	// DEBUGGING
	//BarChart
	// var paper = d3.select('.container').append('svg')
	// 	.attr('width', 500)
	// 	.attr('height', 300);


	// var a = atoms['BarChart'];

	// a = a()

	// a.init([
	// 	{label:"value1", "value":30},
	// 	{label:"value2", "value":50},
	// 	{label:"value3", "value":10},
	// 	{label:"value4", "value":80}
	// ]);

	// a.draw(paper);

	//ScatterPlot
	var atoms = Molecule.getAtoms();

	var paper = d3.select('.container').append('svg')
		.attr('width', 800)
		.attr('height', 600);


	var a = atoms['ScatterPlot'];
	a = a();

	a.init([
		{label:"value1", "x":30, "y":40},
		{label:"value2", "x":50, "y":10},
		{label:"value3", "x":10, "y":140},
		{label:"value4", "x":80, "y":80}
	]);

	a.draw(paper);

};

tests();