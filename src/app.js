//Fancy app js here



// TODO: instead a datastructure to enable quick exclusion
// E.g. a map with keys corresponding to the format of the data

var MoleculeConstructor = function () {
	var atoms = {};

	var registerAtom = function (atom, data) {
		atoms[data.name] = atom;


		/// DEBUGGING
		var paper = d3.select('.container').append('svg')
			.attr('width', 500)
			.attr('height', 300);


		var a = atom();
		a.init([
			{label:"value1", "value":3},
			{label:"value2", "value":5},
			{label:"value3", "value":1},
			{label:"value4", "value":8}
		]);
		a.draw(paper);
	};

	return Object.freeze({
		registerAtom:registerAtom,
		getAtoms:function(){return atoms;}
	});
};

function tests () {
	var atoms = Molecule.getAtoms();


	console.log(atoms);
};


Molecule = MoleculeConstructor();




tests();