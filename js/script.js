$(document).ready(function () {
  var query = 'ritorno al futuro'                     //creo una query momentanea

  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie', //metto url api
    method: 'GET',                                    //seleziono il medoto get
    data: {                                           //seleziono i data che prenderemo dalla api
      api_key : '6cc4521c525a43f7df9f1050e00499bb',
      query : query ,
      language : 'it-IT'
    },
    success: function (data) {                        //dico cosa deve accadere in caso di successo nella ricerca
      var films = data.results;
      // console.log(films);
      printFilms(films);                             //in caso di successo deve applicarsi questa funzione che tra poco creo

    },
    error: function (request , state, errors) {      //dico cosa deve accadere in caso di errore nella ricerca
      console.log(errors);
    }
  }) ;
})


function printFilms(films) {                          //creo funzione che mi servira' per la ricerca films
  for (var i = 0; i < films.length; i++) {            //creo ciclo for dove gli dico di andare a cercare in tutti i films presenti
    var source = $('#film-template').html();          //creo mio template con handlebars
    var template = Handlebars.compile(source);
    var thisFilm = films[i];                          //creo la var thisfilm ovvero la var che conterra'il film che cerchero'
    console.log(thisFilm);
    var context = {                                   //creo var context ovvero tutti i dati che voglio che mi escano nel risultato dopo la ricerca
      title: thisFilm.title,                          //questi risulati pendo dal result della mia api e gli dico che al film ricercato devono uscire
      original_title: thisFilm.original_title,
      original_language: thisFilm.original_language,
      vote_average: thisFilm.vote_average
   };
    var html = template(context);                     //creo var htlm e gli dico dove andare a stampaare nel mio html

    $('.covers').append(html);

  }

}
// "original_title":"Back to the Future",
// "original_language": "en",
// "title": "Back to the Future",
//  "vote_average": 8.2,
