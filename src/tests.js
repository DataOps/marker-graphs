function tests () {
	var atoms = Molecule.getAtoms();

	/// DEBUGGING
	var paper = d3.select('.container').append('svg')
		.attr('width', 500)
		.attr('height', 300);


	// var a = atoms['3dPieChart'];
	var a = atoms['worldchart'];

	a = a()

	a.init([
		{label:"value1", "value":30},
		{label:"value2", "value":50},
		{label:"value3", "value":10},
		{label:"value4", "value":80}
	]);

	a.draw(paper);

};

tests();