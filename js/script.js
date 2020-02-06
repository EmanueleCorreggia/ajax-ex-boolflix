
$(document).ready(function () {
  var query = 'ritorno al futuro'

  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      api_key : '6cc4521c525a43f7df9f1050e00499bb',
      query : query ,
      lenguage : 'it-IT'
    },
    success: function (data) {
      var films = data.results;
      // console.log(films);
      printFilms(films);

    },
    error: function (request , state, errors) {
      console.log(errors);
    }
  }) ;
})


function printFilms(films) {
  for (var i = 0; i < films.length; i++) {
    var source = $('#film-template').html();
    var template = Handlebars.compile(source);
    var thisFilm = films[i];
    console.log(thisFilm);
    var context = { title: "My New Post", body: "This is my first post!" };
    var html = template(context);
  }

}
// "original_title":"Back to the Future",
// "original_language": "en",
// "title": "Back to the Future",
//  "vote_average": 8.2,
