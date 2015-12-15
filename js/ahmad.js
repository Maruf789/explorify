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

            $('#hotttnesss').append("<strong> Hotttness: &nbsp;" + hotttnesss + "&nbsp; </strong) (On A Scale To 10)");
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
