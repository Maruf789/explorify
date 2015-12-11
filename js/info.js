var accessToken = '510913073.888ec0c.76fe22b99cc34953a68a51d57e122d79';
// load groups
// render the groups
// Get saved data from sessionStorage
var groups = JSON.parse(sessionStorage.getItem('groups'));
var users = JSON.parse(sessionStorage.getItem('users'));
var selected = 0;

// $("#groupsView").show();
$("#usersView").hide();

//When User clicks the "Edit/View Group Button"
function showGroupUsers(){
  $("#groupsView").hide();
  $("#usersView").show();  
}

function goBack() {
    //window.history.back();
    $("#groupsView").show();
    $("#usersView").hide();
}


//Default Main Page View (groupView)
if(!groups) {
  console.log("no groups :( For the purpose of keeping localStorage consistent, we have added the first group for you. Please delete them if you want" ); // todo
  groups = [];
}

renderGroups();

// Creating New Group using Modal Submit
$("#myModal form").submit(function() {
  // handle makes sure there's a name! 
  $('#myModal').modal('hide'); 
  var name = $("#groupName").val();
      groups.push({name: name});
      renderGroups();
      sessionStorage.setItem('groups', JSON.stringify(groups));
});

// Deleting Group (from groupView)
function deleteGroup() {
  var id = $(event.target).closest("li").attr('id');
  //delete that item fom renderGroups
  groups.splice(id, 1);
  // save to session
  sessionStorage.setItem('groups', JSON.stringify(groups));
  // rerender groups
  renderGroups();
}
/* work in progress
function deleteUser() {
  var id = $(event.target).closest("li").attr('id');
  users.splice(id, 1);
  //delete that item fom renderUsers
  // save to session
  sessionStorage.setItem('users', JSON.stringify(users));
  // rerender users
  renderUsers();
}
*/

// Editing Group (from groupView)
function editGroup() {
  event.preventDefault();
  var id = $(event.target).closest("li").attr('id');
  //delete that item fom renderGroups
  var name = $("#newGroupName").val();
  groups[selected].name = name;
  // save to session
  sessionStorage.setItem('groups', JSON.stringify(groups));
  // rerender groups
  renderGroups();
  $('#editGroupModal').modal('hide'); 
}

var groupNames = groups.map(function(group) {
  return group.name;
});

function setSelected(i) {
  console.log(" we seletected : " + i);
  selected = i;
}

$('#addToGroupModal').on('show.bs.modal', function (e) {
  $("#groupNames").empty();
  for (var i = 0; i < groups.length; i++) {
    var name = groups[i].name;
    $("#groupNames").append("<option>" + name + "</option>");
  };
});

function addToGroup() {
  $('#addToGroupModal').modal('hide'); 
  var name = $("#addToGroupModal #groupName").val();
  if(name) {
     //var groupame = $("#groupName").val();
      groups.push({name: name});
      groups[groups.length - 1].users = {
        username: selected.username,
        id: selected.id
      }
  }
  else {
    name = $("#groupNames").val();
    var i = 0;
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].name === name) {
        break;
      }
    }
    groups[i].users = { username: selected.username, id: selected.id }
  }
  renderGroups();
  sessionStorage.setItem('groups', JSON.stringify(groups));
  console.log(selected);
  console.log(selected.username);
}

function renderUsers() {
  //$("#groups").empty(); //once updated, empty the previous group list and render new list
  for (var i = 0; i < groups[selected].users.length; i++) {
    console.log("YA ALLAH: " + groups[selected].username);
     $('<ol class="text-left">' +
            '<li id="' + i + '">' +
              '<img class="img-responsive-media" src='+ groups[selected].users[i].profile_picture +' alt="Profile Picture" /></a>' +
              '<strong class="lead">' + groups[selected].users[i].username + '</strong>  &emsp; &emsp; &emsp;' +
              '<a href="https://www.instagram.com/' + groups[selected].users[i].username + '/" target="_blank"> Link To Profile</a>  &emsp; &emsp;' +
              '<a href="https://www.instagram.com/' + groups[selected].users[i].username + '/" target="_blank"> Recent Uploads</a>  &emsp; &emsp;' +
              '<span class="plus"><i title="Remove This User From This Group" class="glyphicon glyphicon-trash" style="color:#FF0000"  onClick="deleteUser()"></i></span>' +
              //'<span><a href="#" title="Remove This User From This Group"><i id="deleteUser" style="color:#FF0000" class="glyphicon glyphicon-trash"></i></a></span>' +
            '</li>' +
        '</ol>' +
        '<br/>').appendTo("#users");
  };
}

function renderGroups() {
  $("#groups").empty(); //once updated, empty the previous group list and render new list
  for (var i = 0; i < groups.length; i++) {
    $('<li style="font-weight: bold"  class="lead" id="' + i + '">' +
        '<h4 style="font-weight: bold"  class="lead" title="Click The Name To See List of Users in This Group" onClick="showGroupUsers()">' + groups[i].name + '</h4>'  +
        '<div class="pull-right">' +
          '<span class="plus"><i class="glyphicon glyphicon-pencil" title="Rename Group" onClick="setSelected('+  i + ')" data-toggle="modal" data-target="#editGroupModal"></i></span>&emsp;' +
          '<span class="plus"><i style="color:#FF0000" class="glyphicon glyphicon-trash" title="Delete Group" onClick="deleteGroup()"></i></span>' +
        '</div>' +
      '</li>' +
      '<br/>').appendTo("#groups");
  };
}
 


//Working on search results (scenario 1: search by username)
$("#searchbox").click(function() {
  event.preventDefault();
  var searchQuery = $("#searchQuery").val();
  console.log("you searched for: " + searchQuery);
  $("#searchResults").empty();

  $.ajax({
    type:     "GET",
    url:      "https://api.instagram.com/v1/users/search?q=" + searchQuery + "&access_token=" + accessToken,
    dataType: "jsonp",
    cache: false,
  }).then(function(response) {
    if(response.meta.code != 200) {
      console.log(response.meta.error_type + ": " + response.meta.error_message);
    }

    /*
     if (response.data.length == 0) {
      $('<div class="padding-custom text-danger lead" >' +
        'Sorry, no results have been found in that search criteria. <br/> It might be caused by the Sandbox Mode, which only allows authorized content. <br/> Please check your search query and try again.' +
        '</div>').appendTo("#searchResults");
     }
     */
    
    // render for each response.data
    console.log("length of the Username result:" + response.data.length);
    for (var i = 0; i < response.data.length; i++) {
      console.log("Username: " +response.data[i].profile_picture);
      console.log("Profile Picture: " +response.data[i].username);
      console.log("Link: http://www.instagram.com/" + response.data[i].username);
      console.log("Recent Uploads: http://www.instagram.com/" + response.data[i].username);
    }
    for (var i = 0; i < response.data.length; i++) {
      $('<div style="padding-left: 25px">' +
                '<img class="img-responsive-profile" src="' + response.data[i].profile_picture + '" alt="Profile Picture" /></a> &nbsp;' +
                '<strong class="lead-sm">' + response.data[i].username + '</strong>  &nbsp;' +
                '<a href="https://www.instagram.com/'+ response.data[i].username +'/" target="_blank"> Profile</a> &nbsp;' +
                '<a href="https://www.instagram.com/'+ response.data[i].username +'" target="_blank">Recent Uploads</a> &nbsp;' +
                '<button class="btn btn-default" title="Add The User To A Group" data-toggle="modal" data-target="#addToGroupModal" onClick="setSelected(' + JSON.stringify(response.data[i]).replace(/"/g, "'") + ')"> &nbsp;ADD &nbsp;' +
                '<span class="plus"><a href="#"><i style="color:#008000" class="glyphicon glyphicon-plus"></i></a></span></button>' +
      '</div>').appendTo("#searchResults");
    };
  });


  $.ajax({
    type:     "GET",
    url:      "https://api.instagram.com/v1/tags/" + searchQuery + "/media/recent?access_token=" + accessToken, 
    dataType: "jsonp",
  }).then(function(response) {
    if(response.meta.code != 200) {
      console.log(response.meta.error_type + ": " + response.meta.error_message);
    }

   console.log("length of the Media result:" + response.data.length);
    for (var i = 0; i < response.data.length; i++) {
      var date = new Date(parseInt(response.data[i].created_time) * 1000);
      console.log("Media: " + response.data[i].images.thumbnail);
      console.log("Caption: " + response.data[i].caption.text);
      console.log("Posted_by: " + response.data[i].images.thumbnail);
      console.log("Created Time: " + (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()); //response.data[i].created_time );
      console.log("Profile Picture: " + response.data[i].username);
      console.log("Link: " + response.data[i].link);
      console.log("Tags: " + response.data[i].tags);
      }
      for (var i = 0; i < response.data.length; i++) {
      var date = new Date(parseInt(response.data[i].created_time) * 1000);
      $('<div class="padding-custom">' +
          '<section class="container-fluid">' +
            '<article class="search-result row">' +
              '<div class="col-md-6 lead-sm">' +
                '<a href="#" title="Search results" ><img class="img-responsive-media" src="' + response.data[i].images.thumbnail.url +'" alt="'+ response.data[i].caption.text +'" /></a>' + 
                '<div> Caption: ' + response.data[i].caption.text + '</div>' +
                '<div> Likes: ' + response.data[i].likes.count + '</div>' +
                '<div> Posted By: ' + response.data[i].user.username +'</div>' +
                '<div> Created On: ' + (date.getMonth()+1) + '/' +date.getDate()+ '/' + date.getFullYear() + '</div>' +  // response.data[i].created_time
                '<div> Link:  <a href="' + response.data[i].link + '" target="_blank">' + 'Click here </a> </div>' +
                '<div> Tags: ' + response.data[i].tags.slice(0,5) + '</div>' +
              '</div>' +
              '<div class="col-md-1">' +
                '<button class="btn btn-default" title="Add The User To A Group" data-toggle="modal" data-target="#addToGroupModal" onClick="setSelected(' + JSON.stringify(response.data[i]).replace(/"/g, "'") + ')"> &nbsp;ADD &nbsp;' +
                '<span class="plus"><a href="#" "><i style="color:#008000" class="glyphicon glyphicon-plus"></i></a></span></button>' +
              '</div>' +
            '</article>' + 
          '</section>' +
        '</div>').appendTo("#searchResults");
      };
    });
});
