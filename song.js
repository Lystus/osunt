var downloaded;
var download_elements = document.getElementsByClassName("beatmap_download_link");
var url = download_elements[download_elements.length - 1].href;
var songid = url.slice(21);
var links = document.getElementsByClassName("beatmap_download_link");

function addToStorage(){
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

for (l of links){
	l.addEventListener("click", addToStorage);
}