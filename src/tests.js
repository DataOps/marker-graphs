function tests () {
	var atoms = Molecule.getAtoms();

	/// DEBUGGING
	var paper = d3.select('.container').append('svg')
		.attr('width', 500)
		.attr('height', 300);


	var a = atoms['BarChart'];

	a = a()

	a.init([
		{label:"value1", "value":3},
		{label:"value2", "value":5},
		{label:"value3", "value":1},
		{label:"value4", "value":8}
	]);

	a.draw(paper);

};

tests();