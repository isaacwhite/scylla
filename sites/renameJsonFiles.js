var fs = require('fs');
var filePath = '/home/isaacwhi/www/scylla/sites/default/files/MTA/';

function logErr(e) {
	console.log(e);
}

fs.readdir(filePath, function(err,files) {
	var i, fname, length, extLength, extension, expectedLength;
	for(i = 0; i < files.length; i++) {
		fname = files[i];
		length = files[i].length;
		extLength = 5;
		extension = fname.substr(length-extLength);
		expectedLength = 12 + extLength; //twelve characters + extension
		if((extension === '.json') && (length === expectedLength)) {
			var renameString = fname + ' => ';
			var newName = fname.substr(0,4) +
			'-' + fname.substr(4,2) +
			'-' + fname.substr(6,2) +
			'_' + fname.substr(8,2) +
			'-' + fname.substr(10,2) +
			extension;
			renameString += newName;
			if(newName.length === expectedLength + 4) {
				fs.rename(filePath + fname,filePath + newName, logErr);
				console.log(renameString);
			} else {
				console.log('ERROR!');
			}
		}
	}
});
