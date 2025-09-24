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
		
		var fileName = "car_num_" + userNumber;
		const psdFileName = activeDocument.name.toLowerCase();
			
		// gets the paint's folder, or prompts for one if one doesn't exist
		saveToPath = checkForPaintPath(app);
		if (saveToPath == null) return;
		
		// paint has a special car type
		var specialCase = checkForSpecialCase();
		if (specialCase != null) {			
			fileName = fileName + "_" + specialCase;
		}
		
		// paint is a helmet
		else if (stringContains(psdFileName, "helmet")) {
			fileName = "helmet_" + userNumber;
		}
		
		// paint is a suit
		else if (stringContains(psdFileName, "suit")) {
			fileName = "suit_" + userNumber;
		}
		
		hideSpecMap();
		
		// save the paint
		//alert(saveToPath + '/' + fileName + ".tga");
		var saveFile = File(saveToPath + '/' + fileName + ".tga");
		saveTarga32(saveFile);		
	} 
	catch (e) {
		alert(e);
		return;
	}
}