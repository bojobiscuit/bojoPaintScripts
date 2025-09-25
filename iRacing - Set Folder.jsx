#target photoshop
#include "bojoScripts.js"

main();

// made by BOJO aka Ray Bracey for iRacing. @bojoracing

function main() {

	if (!documents.length) return;

	try {
//		savePaintPath(app, "")
		if (isNewSavePath(app))
			alert ("New path set!");
	} 
	catch (e) {
		alert(e);
		return;
	}
}