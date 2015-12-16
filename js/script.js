



//fills the table with search results
//gives users a song preview and button for info pg
function fillTable(response){
	var artists,
	name,
	preview_url,
	id;
	arrayOfTracks = response.tracks.items;


    console.log(response);

	
	var length;
	length = response.tracks.items.length;

    for (i=0; i < length; i++){
    	name = arrayOfTracks[i].name;
        artists = arrayOfTracks[i].artists[0].name;
    	preview_url = arrayOfTracks[i].preview_url;
        id = arrayOfTracks[i].id;
    	tr = document.createElement("tr");
    	td_1 = document.createElement("td");
    	td_2 = document.createElement("td");
    	var text_1 = "Title: "+name+"<br> Artist: "+artists+"<br><audio controls><source src=\""+preview_url+"\" type=\"audio/mpeg\"></audio>";
  
    	
    	/*var infoButton = document.createElement("input");

    	infoButton.setAttribute("value","Info");
       	infoButton.setAttribute("type","button");
       	infoButton.onclick = function(){
          console.log("click register");
          
          console.log(name);
          

          
        }*/

        //for later: might need to create  function to open specific info page
        /*var f = function(){
            //open specific info page
            //can replace the onclick w/ this

        }*/
        //or maybe like this
        //var f = new Function('function code here');
        

        //'<input type="button" onClick="gotoNode(\'' + result.name + '\')" />'

        var i_button_text =  "<button onclick=\"openInfo(\'"+id+"\')\" type=\"button\" class=\"btn btn-info\">Info</button>"
        //var i_button_text =  "<button onclick=\"openInfo()\" type=\"button\" class=\"btn btn-info\">Info</button>"

        $('#search-res').append("<tr><td>"+text_1+"</td><td>"+i_button_text+"</td></tr>");

        //$('#search-res').append("<tr><td>"+text_1+"</td><td>"+infoButton.val()+"</td></tr>");
     

    	

    	
    }


}

//store the track id so it can be used on other pages later
function openInfo(track_id){

	console.log("click");
    //var track_id = ???;
    sessionStorage.setItem("track", track_id);

    
    window.open("ahmad.html","_self");

}


//create table after making call to Spotify API for search results
function getTableInfo(searchTerm){
	console.log("here");
    var parameters = {
	url: 'https://api.spotify.com/v1/search',
	data: {
	    q: searchTerm,//"Kanye",//searchTerms,
	    type: 'track'
	},
	success: fillTable
    };
    $.ajax(parameters);


}




function init(){
    var searchTerm = sessionStorage.getItem("searcht");
    
    getTableInfo(searchTerm);

	//getTableInfo();


}

$(document).ready(init);
