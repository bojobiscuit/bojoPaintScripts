#target photoshop
#include "bojoScripts.js"

main();

// made by BOJO aka Ray Bracey for iRacing. @bojoracing

function main() {

	if (!documents.length) return;

	try {
		
		var userNumber = promptForUserNumber();
		if (userNumber == null) 
			return;
		
		saveUserNumber(userNumber);
		
		var checkNumber = loadUserNumber();
		if (checkNumber != null)
			alert("Current user number is: " + checkNumber);
	} 
	catch (e) {
		alert(e);
		return;
	}
}

