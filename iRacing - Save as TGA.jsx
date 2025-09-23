#target photoshop

main();

// made by BOJO aka Ray Bracey for iRacing. @bojoracing

function main() {

	if (!documents.length) return;

	var userNumber = "655163";
	
	try {
		var Name = "car_" + userNumber + ".tga";

		// getting the last word in filename to check for special car types
		var savePath = activeDocument.path;
		words = activeDocument.name.split(/\s+/);
		var popped = words.pop();

		// file type has a special car type	
		if (popped.charAt(0) === '#') {			
			Name = "car_" + userNumber + "_" + popped.slice(1);
		}
		
		// file is a helmet
		else if (Name.lastIndexOf("helmet", 0) === 0) {
			Name = "helmet_" + userNumber + ".tga";
		}
		
		// file is a suit
		else if (Name.lastIndexOf("suit", 0) === 0) {
			Name = "suit_" + userNumber + ".tga";
		}
		
		var saveFile = File(savePath + '/' + Name);
		saveTarga32(saveFile);
	} 
	catch (e) {
		alert("error!");
		return;
	}
}

function saveTarga32(saveFile) {
	targaSaveOptions = new TargaSaveOptions();
	targaSaveOptions.alphaChannels = true;
	targaSaveOptions.resolution = TargaBitsPerPixels.THIRTYTWO;
	activeDocument.saveAs(File(saveFile), targaSaveOptions, true, Extension.LOWERCASE);
};