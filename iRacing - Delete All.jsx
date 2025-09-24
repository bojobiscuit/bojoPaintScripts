#target photoshop
#include "bojoScripts.js"

main();

// made by BOJO aka Ray Bracey for iRacing. @bojoracing

function main() {

	if (!documents.length) return;
	
	// gets the user's iracing number, or prompts for one if it doesn't exist
	var userNumber = checkForUserNumber(app);
	if (userNumber == null) return;
	
	// gets the paint's folder, or prompts for one if one doesn't exist
	saveToPath = checkForPaintPath(app);
	if (saveToPath == null) return;		

	try {
		deleteMyFiles(userNumber);
	}
	catch (e) {
		alert(e);
		return;
	}
}
