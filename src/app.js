//Fancy app js here



// TODO: instead a datastructure to enable quick exclusion
// E.g. a map with keys corresponding to the format of the data

var MoleculeConstructor = function () {
	var atoms = {};

	var registerAtom = function (atom, data) {
		atoms[data.name] = atom;
		
	};

	return Object.freeze({
		registerAtom:registerAtom,
		getAtoms:function(){return atoms;}
	});
};




Molecule = MoleculeConstructor();
// tests();