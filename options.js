var timeout;

function setMessage(text){
	if (timeout){
		window.clearTimeout(timeout);
		timeout = null;
	}
	document.getElementById("message").innerHTML = text;
	timeout = window.setTimeout(function(){
		document.getElementById("message").innerHTML = "";
		timeout = null;
	}, 2000);
}

chrome.storage.local.get(
	function(items){
		document.getElementById("values").value = items["downloaded"];
		document.getElementById("colorpicker").value = items["downloaded_color"];
		console.log("Values gotten");
	}
);

document.getElementById("textsubmit").addEventListener("click", function(){
	chrome.storage.local.set(
		{"downloaded": document.getElementById("values").value.replace(" ", "").split(",")},
		function(){
			console.log("Values set (text)");
			setMessage("Values set (text)");
		}
	);
});

document.getElementById("files").addEventListener("change", function(){
	var files = document.getElementById("files").files;
	var ids = [];
	for (file of files){
		var id = file.webkitRelativePath.split(" ")[0].slice(6);
		if (!ids.includes(id) && !isNaN(parseInt(id))) {
			ids.push(id);
		}
	}
	if (ids.length == 0){
		alert("Wrong directory chosen or 0 songs found");
	} else {
		chrome.storage.local.set(
			{"downloaded": ids},
			function(){
				console.log("Values set (files)");
				setMessage("Values set (files)");
				document.getElementById("values").value = ids;
			}
		)
	}
});

document.getElementById("colorpicker").addEventListener("change", function(){
	var value = document.getElementById("colorpicker").value;
	chrome.storage.local.set(
		{"downloaded_color": value},
		function(){
			console.log("Color set " + value);
			setMessage("Color set " + value);
		}
	);
});