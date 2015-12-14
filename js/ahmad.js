var album, pop;

function getRegTrackInfo(track_id){
	$.ajax({
    	type: "GET",
    	url:  "https://api.spotify.com/v1/tracks/"+track_id,
    	success:function(response){
    		album = response.album.name;
    		pop = response.popularity;



    	}
    });

}

function getTrackInfo(track_id){
	getRegTrackInfo(track_id);

	$.ajax({
    	type: "GET",
    	//dataType: "jsonp",

		url:"http://developer.echonest.com/api/v4/track/profile?api_key=WHD0IITAIFZXJFO7I&id=spotify:track:"+track_id+"&bucket=audio_summary",
		
    	success: function(response){
    		console.log(response);
    		var artist, loud, key, mode, tempo, sig, dance, name;
    		console.log(response.response);
    		artist = response.response.track.artist;
    		name = response.response.track.title;
    		loud = response.response.track.audio_summary.loudness;
    		dance = response.response.track.audio_summary.danceability;
    		key = response.response.track.audio_summary.key;
    		mode = response.response.track.audio_summary.mode;
    		tempo = response.response.track.audio_summary.tempo;
    		sig = response.response.track.audio_summary.time_signature;

    		$('#search-res').append("<tr><td> Track Name: "+name+"</td><td> Album Name: "+album+"</td></tr>");
    		$('#search-res').append("<tr><td> Artist: "+artist+"</td><td> Popularity: "+pop+"</td></tr>");
    		$('#search-res').append("<tr><td> Loudness: "+loud+"</td><td> Danceability: "+dance+"</td></tr>");
    		$('#search-res').append("<tr><td> Key: "+key+"</td><td> Mode: "+mode+"</td></tr>");
    		$('#search-res').append("<tr><td> Tempo: "+tempo+"</td><td> Time Signature: "+sig+"</td></tr>");

    	}
	});



}

function init(){
	var track_id = sessionStorage.getItem("track");
	getTrackInfo(track_id);
	//console.log(track_id);




}

$(document).ready(init);
