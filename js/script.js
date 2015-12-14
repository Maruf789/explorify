




function fillTable(response){
	var artists,
	name,
	preview_url;
	arrayOfTracks = response.tracks.items;

	//var table_body = document.getElementById("search-res").getElementsByTagName("tbody");

	var length;
	length = response.tracks.items.length;

    for (i=0; i < length; i++){
    	name = arrayOfTracks[i].name;
        artists = arrayOfTracks[i].artists[0].name;
    	preview_url = arrayOfTracks[i].preview_url;
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

        var i_button_text =  "<button onclick=\"openInfo\" type=\"button\" class=\"btn btn-info\">Info</button>"

        $('#search-res').append("<tr><td>"+text_1+"</td><td>"+i_button_text+"</td></tr>");

        //$('#search-res').append("<tr><td>"+text_1+"</td><td>"+infoButton.val()+"</td></tr>");
     

    	

    	
    }


}

function openInfo(){
	console.log("click");
}



function getTableInfo(searchTerm){
	console.log("here");
    var parameters = {
	url: 'https://api.spotify.com/v1/search',
	data: {
	    q: searchTerm,
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
