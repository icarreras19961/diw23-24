var client_id = "cd351f180b6542998bc2c6e359c76b0a";
var client_secret = "b7b1e82f11cd42608074f003fce63b36";
var access_token = "11dFghVXANMlKmJXsNCbNl";

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = "https://api.spotify.com/";
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + "v1/search?type=artist,track&q=" + artist,
    headers: {
      Authorization: "Bearer " + access_token,
    },
  }).done(function (response) {
    console.log(response.artists);
    let model;
    for (let i = 0; i <= 19; i++) {
      model = response.artists.items[i];
      let img;
      if (model.images.length != 0) {
        img = model.images[1].url;
      } else {
        img = "/ejercicios/ejercicio5/img/mixi.jpg";
      }
      $("#results_artist").append(
        `<div class="artistId" data-id="${model.id}"><h1>${model.name}</h1><h2>Popularity: ${model.popularity}</h2><img class="avatar" src=${img} alt=""></div><hr>`
      );
    }
  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + "v1/artists/" + artistId + "/albums",
    headers: {
      Authorization: "Bearer " + access_token,
    },
  }).done(function (response) {
    console.log(response);
    let model;
    for (let i = 0; i <= 19; i++) {
      model = response.items[i];
      let img;
      if (model.images.length != 0) {
        img = model.images[1].url;
      } else {
        img = "/ejercicios/ejercicio5/img/mixi.jpg";
      }
      model = response.items[i];
      $("#results_album").append(
        `<div class="artistId" data-id="${model.id}">
        <h2>${model.name}</h2>
        <p>Total tracks: ${model.total_tracks}</p>
        <img src=${img} alt="">
        <button id="showSongs">Show Songs</button>
        </div><hr>`
      );
    }
  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Basic " + btoa(client_id + ":" + client_secret)
      );
    },
    dataType: "json",
    data: { grant_type: "client_credentials" },
  }).done(function (response) {
    access_token = response.access_token;
  });

  var spotify = new Spotify();

  $("#artist_name").on("keyup", function () {
    $("#results_album").html("");
    $("#results_artist").html("");
    spotify.getArtist($("#artist_name").val());
  });

  $("#results_artist").on("click", ".artistId", function () {
    $("#results_album").html("");
    spotify.getArtistById($(this).attr("data-id"));
  });
});
