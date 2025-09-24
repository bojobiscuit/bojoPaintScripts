#target photoshop
#include "bojoScripts.js"

main();

// made by BOJO aka Ray Bracey for iRacing. @bojoracing

function main() {

	if (!documents.length) return;
	
	try {
		
		// gets the user's iracing number, or prompts for one if it doesn't exist
		var userNumber = checkForUserNumber();
		if (userNumber == null) return;
		
		var fileName = "car_spec_" + userNumber;

		// gets the paint's folder, or prompts for one if one doesn't exist
		saveToPath = checkForPaintPath(app);
		if (saveToPath == null) return;
		
		showSpecMap();
		
		// save the paint
		var saveFile = File(saveToPath + '/' + fileName + ".tga");
		saveTarga32(saveFile);		
	} 
	catch (e) {
		alert(e);
		return;
	}
}