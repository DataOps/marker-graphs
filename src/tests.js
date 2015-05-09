function tests () {
	var atoms = Molecule.getAtoms();

	/// DEBUGGING
	var paper = d3.select('.container').append('svg')
		.attr('width', document.width - 20)
		.attr('height', 800);


	// DEBUGGING
	//BarChart
	// var paper = d3.select('.container').append('svg')
	// 	.attr('width', 500)
	// 	.attr('height', 300);



	// bc.init([
	// 	{label:"value1", "x":30, "y":40},
	// 	{label:"value2", "x":50, "y":10},
	// 	{label:"value3", "x":10, "y":140},
	// 	{label:"value4", "x":80, "y":80}
	// ]);

	// a.draw(paper);

	//ScatterPlot
	var atoms = Molecule.getAtoms();



	// var a = atoms['3dPieChart'];
	// var a = atoms['ScatterPlot'];

	var bc = atoms['BarChart'];
	bc = bc()

	bc.init([
		{label:"BallaKjelli", "value":150},
		{label:"Bengt", "value":10},
		{label:"Jimmy", "value":30},
		{label:"Morhaf", "value":60},
		{label:"John", "value":30},
		{label:"Patrik", "value":150},
		{label:"Oscar", "value":100},
		{label:"David", "value":80}
	],{title:"Who rules tha most?"});

	bc.draw(paper);

	// // worldchart
	// var wc = atoms['worldchart'];
	// wc = wc();

	// wc.init([
	// 	{SWE: 400},
	// 	{USA: 200},
	// 	{NOR: 100}
	// ]);

	// wc.draw(paper);


};

tests();