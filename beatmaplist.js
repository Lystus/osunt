function refresh(){
	chrome.storage.local.get(
		function(items){
			var downloaded = items["downloaded"];
			var color = items["downloaded_color"];
			var beatmaps = document.body.getElementsByClassName("beatmap");
			for (beatmap of beatmaps){
				if(downloaded.includes(beatmap.id)){
					beatmap.style.color = color;
				} else {
					beatmap.style.color = "#00fbff";
				}
			};
		}
	);
}
refresh();
chrome.storage.onChanged.addListener(function(changes, areaName){
	refresh();
	console.log("Refreshed");
});

var download_links = document.getElementsByClassName("beatmap_download_link");

for (dlink of download_links){
	dlink.addEventListener("click", function(){
		var id = this.parentElement.parentElement.id;
		chrome.storage.local.get(
			function(items){
				var downloaded = items["downloaded"];
				if (!downloaded.includes(id)){
					downloaded.push(id);
					chrome.storage.local.set(
						{"downloaded": downloaded}
					);
				} else {
					alert("Note: you have already downloaded this song!");
				}
			}
		);
	});
}