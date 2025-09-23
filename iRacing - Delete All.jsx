#target photoshop

main();

// made by BOJO aka Ray Bracey for iRacing. @bojoracing

function main() {

	if (!documents.length) return;
	
	var userNumber = "655163";

	try {
		var folder = new Folder(activeDocument.path);
		var files = folder.getFiles();
		for (var i = 0; i < files.length; i++) {

			// if my racing number exists in the filename
			if (files[i].name.lastIndexOf(userNumber) > 0) {
				
				// if the file type is either tga or mip
				if (files[i].name.lastIndexOf(".tga") > 0 || files[i].name.lastIndexOf(".mip") > 0) {
					files[i].remove();
				}
			}
		}
	}
	catch (e) {
		alert(e);
		return;
	}

	// alert("Deleted all within\n\n" + activeDocument.path);
}
