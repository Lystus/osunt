
function refresh(){
	chrome.storage.local.get(
		function(items){
			var downloaded = items["downloaded"];
			var color = items["downloaded_color"];
			var headers = document.body.getElementsByClassName("beatmapset-panel__cover-container");
			for (header of headers){
                var id = header.href.split("/").pop()
				if(downloaded.includes(id)){
                    header.parentElement.style.color = color;
				} else {
					header.parentElement.style.color = "#26ff00";
				}
			};
		}
	);

	const downloadLinks = document.querySelectorAll('a.beatmapset-panel__menu-item');
	console.log(`Donwload links: ${downloadLinks.length}`);
	for (let i = 0; i < downloadLinks.length; i++) {
		const element = downloadLinks[i];
		const downloadURLSplit = element.href.split('/');
		downloadURLSplit.pop();
		const songId = downloadURLSplit.pop();
		element.addEventListener('click', onDownloadClick);
	}
}

function onDownloadClick(event) {
	let element = undefined;
	if(event.srcElement.nodeName === 'a' || event.srcElement.nodeName === 'A'){
		element = event.srcElement;
	} else {
		element = event.srcElement.parentElement;
	}

	const downloadURLSplit = element.href.split('/');
	downloadURLSplit.pop();
	const songId = downloadURLSplit.pop();
	chrome.storage.local.get(
		"downloaded",
		function(item){
			downloaded = item["downloaded"];
			if (!downloaded.includes(songId)){
				downloaded.push(songId);
				chrome.storage.local.set(
					{"downloaded": downloaded},
					function(){
						console.log("Storage set");
					}
				);
			} else {
				console.log("Song already downloaded");
				alert("Note: you have already downloaded this song!");
			}
		}
	);
}

function addToStorage(){
	var songid = window.location.href.split("/")[4].split("#")[0];
	chrome.storage.local.get(
		"downloaded",
		function(item){
			var downloaded = item["downloaded"];
			if (!downloaded.includes(songid)){
				downloaded.push(songid);
				chrome.storage.local.set(
					{"downloaded": downloaded},
					function(){
						console.log("Storage set");
					}
				);
			} else {
				console.log("Song already downloaded");
				alert("Note: you have already downloaded this song!");
			}
		}
	);
}

var interval;
function beatmapsets() {
	console.log("beatmapsets called");
	refresh();
	interval = setInterval(refresh, 1000);
}


function mapset() {
	function setInfoColor() {
		chrome.storage.local.get(items => {
			if (items["downloaded"].includes(songid)) {
				document.getElementsByClassName("beatmapset-info")[0].style.backgroundColor = items["downloaded_color"];
			}
		});
	}
	
	clearInterval(interval);
    console.log("mapset called");
    var links = document.getElementsByClassName("js-beatmapset-download-link");
	var songid = links[0].href.split("/")[4];
	setTimeout(setInfoColor, 1000);
	chrome.storage.onChanged.addListener(setInfoColor);

    for (l of links){
        l.addEventListener("click", addToStorage);
    }
}

var oldLocation;
function locationListener() {
	var location = window.location.href;
	if (!oldLocation || oldLocation != location) {
		onLocationChange();
		oldLocation = location;
	}
}

function onLocationChange() {
	run();
}

function run() {
	if (window.location.href.split("/").length > 4) {
		mapset();
	} else {
		beatmapsets();
	}
}

setInterval(locationListener, 500);