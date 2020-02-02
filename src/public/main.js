console.log("on web");

const socket = io();

fetch("/api/v1/matches")
  .then(function(response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }
    response.json().then(function(data) {
      console.log(data);
      _id.value = data[0]._id;
      team1.value = data[0].teams[0].name;
      team2.value = data[0].teams[1].name;
      // players1.value = data[0].teams[0].players;
      // plyers2.value = data[0].teams[1].players;
      loc.value = data[0].location;
      matchDate.value = data[0].matchDate;
      matchHour.value = data[0].matchHour;
      result.value = data[0].result;
      // goals.value = data[0].goals;
    });
  })
  .catch(function(err) {
    console.log("Fetch Error :-S", err);
  });

// dom elements

let team1 = document.getElementById("team1");
let team2 = document.getElementById("team2");
let players1 = document.getElementById("players1");
let players2 = document.getElementById("players2");
let loc = document.getElementById("loc");
let matchDate = document.getElementById("matchDate");
let matchHour = document.getElementById("matchHour");
let result = document.getElementById("result");
let goals = document.getElementById("goals");
let _id = document.getElementById("_id");

let btn = document.getElementById("send");

btn.addEventListener("click", function() {
  socket.emit("post:data", {
    _id: _id.value,
    team1: team1.value,
    team2: team2.value,
    //  players1: players1.value,
    //  plyers2: players2.value,
    location: loc.value,
    matchDate: matchDate.value,
    matchHour: matchHour.value,
    result: result.value
    // goals: goals.value
  });
});

socket.on("post:data", data => {
  console.log(data);
  _id.value = data._id;
  team1.value = data.teams[0].name;
  team2.value = data.teams[1].name;
  // players1.value = data[0].teams[0].players;
  // plyers2.value = data[0].teams[1].players;
  location.value = data.location;
  matchDate.value = data.matchDate;
  matchHour.value = data.matchHour;
  result.value = data.result;
});
socket.on("message", message => {
  console.log(JSON.stringify(message));
  alert(message.message);
});
