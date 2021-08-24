var downloaded;
var links = document.getElementsByClassName("js-beatmapset-download-link");
var songid = links[0].href.split("/")[4];

function addToStorage(){
    console.log("button pressed");
	chrome.storage.local.get(
		"downloaded",
		function(item){
			downloaded = item["downloaded"];
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
console.log("mapset.js called");
for (l of links){
	l.addEventListener("click", addToStorage);
}