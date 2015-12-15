api_key="WHD0IITAIFZXJFO7I";
var album, pop, artist_id, biography, reviews_url, reviews_title, reviews_summary;

//API call for track info
function getRegTrackInfo(track_id){
    $.ajax({
        type: "GET",
        url:  "https://api.spotify.com/v1/tracks/"+track_id,
        success:function(response){
            album = response.album.name;
            pop = response.popularity;
            artist_id = response.artists.id;
        }
    });
}

//API call for Spotify Song Player  (30s Preview)
function getPlayer(track_id){
    getRegTrackInfo(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"https://embed.spotify.com/?uri=spotify:track:" + track_id;
        url:"http://developer.echonest.com/api/v4/artist/images?api_key=" + api_key + "&id=" + artist_id + "&format=json&results=1&start=0&license=unknown",
        
        success: function(response){
            //console.log(response);
            var player;
            //console.log(response);
            player = response;
            console.log("Track Player: " + player);

            $('#player').append("<iframe src='" + player + "' width='100%' height='100px' frameborder='0' allowtransparency='true'></iframe>");
        }
    });
}

//API Call for Track Info Panel (includes all acoustic measurements, and track details)
function getTrackInfo(track_id){
	getRegTrackInfo(track_id);

	$.ajax({
    	type: "GET",
    	//dataType: "jsonp",

		url:"http://developer.echonest.com/api/v4/track/profile?api_key=WHD0IITAIFZXJFO7I&id=spotify:track:"+track_id+"&bucket=audio_summary",
		
    	success: function(response){
    		console.log(response);
    		var artist, loud, key, mode, tempo, sig, dance, name, energy, liveness, instrumentalness, speechiness, acousticness, duration;
    		console.log(response.response);
    		artist = response.response.track.artist;
    		name = response.response.track.title;
    		loud = parseFloat((response.response.track.audio_summary.loudness)).toFixed(3);
    		dance = parseFloat((response.response.track.audio_summary.danceability)).toFixed(3);
    		key = response.response.track.audio_summary.key; 
    		mode = response.response.track.audio_summary.mode;
    		tempo = response.response.track.audio_summary.tempo;
    		sig = response.response.track.audio_summary.time_signature;
            energy = parseFloat((response.response.track.audio_summary.energy)).toFixed(3);
            liveness = parseFloat((response.response.track.audio_summary.liveness)).toFixed(3);
            instrumentalness = parseFloat((response.response.track.audio_summary.instrumentalness)).toFixed(3);
            speechiness = parseFloat((response.response.track.audio_summary.speechiness)).toFixed(3);
            acousticness = parseFloat((response.response.track.audio_summary.acousticness)).toFixed(3);
            duration = parseFloat((response.response.track.audio_summary.duration)).toFixed(0);

    		$('#search-res').append("<tr><td> Track Name: &nbsp;"+name+"&nbsp;</td><td> Album Name: &nbsp;"+album+"&nbsp;</td></tr>");
    		$('#search-res').append("<tr><td> Artist: &nbsp;"+artist+"&nbsp;</td><td title='For details, see http://spoti.fi/1QIU0X2'> Popularity: &nbsp;"+pop+"&nbsp; (Scale from 0 to 100)</td></tr>");
    		$('#search-res').append("<tr><td title='Loudness is the overall loudness of a track in decibels (dB). Loudness values in the Analyzer are averaged across an entire track and are useful for comparing relative loudness of segments and tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). For details, see http://bit.ly/1NQOOzE'> Loudness: &nbsp;"+loud+"&nbsp; (Decibles)</td><td title='Describes how suitable a track is for dancing using a number of musical elements (the more suitable for dancing, the closer to 1.0 the value). The combination of musical elements that best characterize danceability include tempo, rhythm stability, beat strength, and overall regularity. The higher the value, the easier it is to dance to this song. For details, see http://bit.ly/1lLbkPX'> Danceability: &nbsp;"+dance+"&nbsp; (Scale from  0.0 to 1.0)</td></tr>");
    		$('#search-res').append("<tr><td title='Key is the estimated overall key of a track. The key identifies the tonic triad, the chord, major or minor, which represents the final point of rest of a piece. For details, see http://bit.ly/1NQOOzE '> Key: &nbsp;"+key+"&nbsp;</td><td title='Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. For details see http://bit.ly/1NQOOzE'> Mode: &nbsp;"+mode+"&nbsp; (modality)</td></tr>");
    		$('#search-res').append("<tr><td title='Tempo is the overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration. For details, see http://bit.ly/1NQOOzE'> Tempo: &nbsp;"+tempo+"&nbsp; (BPM)</td><td title='Time Signature is an estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). For details, see http://bit.ly/1NQOOzE'> Time Signature: &nbsp;"+sig+"&nbsp; (Meter)</td></tr>");
            $('#search-res').append("<tr><td title='Represents a perceptual measure of intensity and powerful activity released throughout the track. Typical energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy. The higher the value, the more energtic song. For details, see http://bit.ly/1lLbkPX'> Energy: &nbsp;"+energy+"&nbsp; (Scale from  0.0 to 1.0)</td><td title='Detects the presence of an audience in the recording. The more confident that the track is live, the closer to 1.0 the attribute value. Due to the relatively small population of live tracks in the overall domain, the threshold for detecting liveness is higher than for speechiness. A value above 0.8 provides strong likelihood that the track is live. Values between 0.6 and 0.8 describe tracks that may or may not be live or contain simulated audience sounds at the beginning or end. Values below 0.6 most likely represent studio recordings. For details, see http://bit.ly/1lLbkPX'> Liveness: &nbsp;"+liveness+"&nbsp;(Scale from 0.0 to 1.0)</td></tr>");
            $('#search-res').append("<tr><td title='Represents the likelihood a recording was created by solely acoustic means such as voice and acoustic instruments as opposed to electronically such as with synthesized, amplified, or effected instruments. Tracks with low acousticness include electric guitars, distortion, synthesizers, auto-tuned vocals, and drum machines, whereas songs with orchestral instruments, acoustic guitars, unaltered voice, and natural drum kits will have acousticness values closer to 1.0. The higher the value the more acoustic the song is. For details, see http://bit.ly/1lLbkPX> Acousticness: &nbsp;"+acousticness+"&nbsp; (Scale from 0.0 to 1.0)</td><td title='The higher the value the more instrumental the song is. For more details, see http://static.echonest.com/SortYourMusic/'> Instrumentalness: &nbsp;"+instrumentalness+"&nbsp; (Scale from 0.0 to 10.0) </td></tr>");
            $('#search-res').append("<tr><td title='Detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks. For more details, see http://bit.ly/1lLbkPX'> Speechiness: &nbsp;"+speechiness+"&nbsp;(Scale from 0.0 to 1.0) </td><td title='The duration of a track in seconds as precisely computed by the audio decoder. For details, see http://bit.ly/1NQOOzE'> Duration: &nbsp;"+duration+"&nbsp; (Seconds)</td></tr>");
    	}
	});
}

//API call for Artist's image
function getImage(track_id){
    getRegTrackInfo(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"http://developer.echonest.com/api/v4/artist/images?api_key=" + api_key + "&id=" + artist_id + "&format=json&results=1&start=0&license=unknown",
        
        success: function(response){
            console.log(response);
            var artist_image;
            console.log(response.response);
            artist_image = response.response.images.url;
            console.log("Artists's image_url: " + artist_image);

            $('#artist_image').append("<img class='img-responsive-media' src='" + artist_image + "' alt='The picture of the artist of the track' />");
        }
    });
}

//API call for Artist's Hotttnesss (on a scale to 10)
function getHotttnesss(track_id){
    getRegTrackInfo(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"http://developer.echonest.com/api/v4/artist/hotttnesss?api_key=" + api_key + "&id=" + artist_id + "&format=json", 
                
        success: function(response){
            console.log(response);
            var hotttnesss;
            console.log(response.response);
            hotttnesss = parseFloat(Math.round((response.response.artist.hotttnesss) * 10)).toFixed(1);
            console.log("Artists's hotttnesss: " + hotttnesss);

            $('#hotttnesss').append("<strong> Hotttness: &nbsp;" + hotttnesss + "&nbsp; </strong) (On A Scale 1 to 10)");
        }
    });
}

//API call for Artist's Spotify followers
function getSpotifyFollowers(track_id){
    getRegTrackInfo(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"https://api.spotify.com/v1/artists/"  + artist_id,
                
        success: function(response){
            console.log(response);
            var followers;
            console.log(response.response);
            followers = response.response.followers.total;
            console.log("Artists's Spotify Followers: " + followers);

            $('#followers').append("<strong> Spotify Followers: &nbsp;" + followers + "</strong>");
        }
    });
}

//API call for Artist's official website
function getOfficialWebsite(track_id){
    getRegTrackInfo(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"http://developer.echonest.com/api/v4/artist/urls?api_key=" + api_key + "&id=" + artist_id + "&format=json",
        
        success: function(response){
            console.log(response);
            var official_website;
            console.log(response.response);
            official_website = response.response.url.official_url;
            console.log("Artists's Official Website: " + official_website);

            $('#official_website').append("<strong> Official Website: &nbsp;" + official_website + "</strong>");
        }
    });
}

//API call for Artist's Twitter
function getTwitter(track_id){
    getRegTrackInfo(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"http://developer.echonest.com/api/v4/artist/twitter?api_key=" + api_key + "&id=" + artist_id + "&format=json",
        
        success: function(response){
            console.log(response);
            var twitter;
            console.log(response.response);
            twitter = response.response.artist.twitter;  //handling No Twitter Account is required
            console.log("Artists's Twitter: " + twitter);

            $('#twitter').append("<strong> Follow on Twitter: &nbsp;" + twitter + "</strong>");
        }
    });
}

//API call for Artist's Biography
function getBiography(track_id){
    getRegTrackInfo(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"http://developer.echonest.com/api/v4/artist/biographies?api_key=" + api_key + "&id=" + artist_id + "&format=json&results=1&start=0&license=cc-by-sa",
        
        success: function(response){
            console.log(response);
            console.log(response.response);
            biography = response.response.biographies.text;
            console.log("Artists's Biography: " + biography);
        }
    });
}


//API call for a Recent Blog Post on the Artist + Biography (from the previous getBiography() method)
function getBlogpostBio(track_id){
    getRegTrackInfo(track_id);
    getBiography(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"http://developer.echonest.com/api/v4/artist/blogs?api_key=" + api_key + "&id=" + artist_id + "&format=json&results=1&start=0",
        
        success: function(response){
            console.log(response);
            var blog_url, blog_title, blog_summary;
            console.log(response.response);
            blog_url = response.response.blogs.url;
            blog_title = response.response.blogs.name;
            blog_summary = response.response.blogs.summary;
            console.log("Artists's blog_url: " + blog_url);
            console.log("Artists's blog_title: " + blog_title);
            console.log("Artists's blog_summary: " + blog_summary);

            $('#bio_blog').append("<tr><td> <p>" + biography + "</p></td> <td> <h5> <strong> <a href='" + blog_url + "' target='_blank'>" + blog_title + "</a> <strong> <h5> <p>" + blog_summary + "<p> </td> </tr>");
        }
    });
}

//API call for Reviews on Artist's work
function getReviews(track_id){
    getRegTrackInfo(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"http://developer.echonest.com/api/v4/artist/reviews?api_key=" + api_key + "&id=" + artist_id + "&format=json&results=1&start=0",
        
        success: function(response){
            console.log(response);
            console.log(response.response);
            reviews_url = response.response.reviews.url;
            reviews_title = response.response.reviews.name;
            reviews_summary = response.response.reviews.summary;
            console.log("Artists's reviews_url: " + reviews_url);
            console.log("Artists's reviews_title: " + reviews_title);
            console.log("Artists's reviews_summary: " + reviews_summary);
        }
    });
}

//API call for a Recent News on the Artist + Reviews (from the previous getReviews() method)
function getNewsReviews(track_id){
    getRegTrackInfo(track_id);
    getReviews(track_id);

    $.ajax({
        type: "GET",
        //dataType: "jsonp",

        url:"http://developer.echonest.com/api/v4/artist/news?api_key=" + api_key + "&id=" + artist_id + "&format=json&results=1&start=0",
        
        success: function(response){
            console.log(response);
            var news_url, news_title, news_summary;
            console.log(response.response);
            news_url = response.response.news.url;
            news_title = response.response.news.name;
            news_summary = response.response.news.summary;
            console.log("Artists's news_url: " + news_url);
            console.log("Artists's news_title: " + news_title);
            console.log("Artists's news_summary: " + news_summary);

            $('#reviews_news').append("<tr> <td> <h5> <strong> <a href='" + reviews_url + "' target='_blank'>" + reviews_title + "</a> <strong> <h5> <p>" + reviews_summary + "<p> </td> <td> <h5> <strong> <a href='" + news_url + "' target='_blank'>" + news_title + "</a> <strong> <h5> <p>" + news_summary + "<p> </td> </tr>");
        }
    });
}

function init(){
	var track_id = sessionStorage.getItem("track");
	getTrackInfo(track_id);
	//console.log(track_id);
}

$(document).ready(init);
