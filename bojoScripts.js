/*

<javascriptresource>

<menu>dummy_menu</menu>

</javascriptresource>

*/

// made by BOJO aka Ray Bracey for iRacing. @bojoracing

function saveTarga32(saveFile) {
	targaSaveOptions = new TargaSaveOptions();
	targaSaveOptions.alphaChannels = true;
	targaSaveOptions.resolution = TargaBitsPerPixels.THIRTYTWO;
	activeDocument.saveAs(File(saveFile), targaSaveOptions, true, Extension.LOWERCASE);
};

function savePaintPath(app, paintSavePath)
{
	var doc = app.activeDocument;
	doc.info.instructions = "bojoPath:" + paintSavePath;
	//doc.info.instructions = "reset";
}

function getPaintPath(app)
{
	var saveData = app.activeDocument.info.instructions;
	
	if (stringContains(saveData, "bojoPath")) {
		return saveData.substring(9);
	}
	
	return null;
}

function checkForPaintPath(app)
{
	var saveToPath = getPaintPath(app);
	
	// debug: uncomment to select new save path;
	//saveToPath = null;

	// If no save path, prompt the user for one and store that path
	if (saveToPath == null && isNewSavePath(app))
		saveToPath = getPaintPath(app);
	
	if (saveToPath == null)
		alert("an unexpected error has occured");

	return saveToPath;
}

function isNewSavePath(app) 
{
	var selectedFolder = Folder.selectDialog("Select a folder for where this paint will be exported to");
	if (selectedFolder != null) {
		savePaintPath(app, selectedFolder.fullName);
		return true;
	}	
	
	// User cancelled the dialog
	alert("No folder was selected when one was needed. Please try again.");	
	return false;
}

function checkForSpecialCase()
{
	words = activeDocument.name.split(/\s+/);
	var popped = words.pop();

	// file type has a special car type
	if (popped.charAt(0) === '#')
		return popped.slice(1);

	return null;
}

function stringContains(stringA, stringB)
{
	return stringA.indexOf(stringB) >= 0
}

function loadUserNumber()
{
    const saveFile = File("~/Documents/iRacing/paint/userNumber.txt");
	
    if (!saveFile.exists)
		return null;

    saveFile.encoding = "UTF8";
    saveFile.open("e", "TEXT", "????");
    var readLine = saveFile.readln();
    saveFile.close();

	return readLine;
}

function saveUserNumber(userNumber)
{
    const saveFile = File("~/Documents/iRacing/paint/userNumber.txt");
	
    if (saveFile.exists)
        saveFile.remove();

    saveFile.encoding = "UTF8";
    saveFile.open("e", "TEXT", "????");
    saveFile.writeln(userNumber);
    saveFile.close();
}

function checkForUserNumber()
{
	var userNumber = loadUserNumber();
	if (userNumber == null)
	{
		userNumber = promptForUserNumber();
		if(userNumber == null) {
			alert("no number set. Please try again");
			return;
		}
		saveUserNumber(userNumber);
	}
	return userNumber;
}

function promptForUserNumber()
{
	var newNumber = prompt("Enter your iRacing number to use for the Bojo paint scripts. This will be stored in a text file in your paints folder. You can either change it here, or manually edit that file.", "", "Set iRacing Number");
	if (newNumber == null) {
		alert("No number set.");
	}
	return newNumber;
}

function setSpecMapFolderVisible(theBool)
{
	for (var i = 0; i < app.activeDocument.layers.length ; i++) {
		if(stringContains(app.activeDocument.layers[i].name.toLowerCase(), "spec")) {
			app.activeDocument.layers[i].visible = theBool;
			break;
		}
	}
}

function hideSpecMap() {
	return setSpecMapFolderVisible(false);
}

function showSpecMap() {
	return setSpecMapFolderVisible(true);
}

function deleteMyFiles(userNumber) {
	var folder = new Folder(saveToPath);
	var files = folder.getFiles();
	for (var i = 0; i < files.length; i++) {

		// if my racing number exists in the filename
		if (stringContains(files[i].name, userNumber)) {
				
			// if the file type is either tga or mip
			if (stringContains(files[i].name, ".tga") || stringContains(files[i].name, ".mip"))
				files[i].remove();
		}
	}
}

function deleteNumFile(userNumber) {
	var folder = new Folder(saveToPath);
	var files = folder.getFiles();
	for (var i = 0; i < files.length; i++) {

		// if my racing number exists in the filename
		if (stringContains(files[i].name, userNumber)) {
				
			// if the file type is a tga file that is used for the non sim stamped paints
			if (stringContains(files[i].name, ".tga") && stringContains(files[i].name, "_num_"))
				files[i].remove();
		}
	}
}
