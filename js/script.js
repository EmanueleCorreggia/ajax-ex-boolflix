$(document).ready(function () {

  $('#query-button').click(function(){                 //gli dico che quando faccio click sul bottone search
    var query = $('#query').val();                     //mi va a prendere il valore inserito nel input
    getMovies(query);                                  //gli dico che deve eseguire la funzione per prendere il film cercato
    resetSearch();                                     //
  });

});

function resetSearch() {                                //creo funzione che resetta la barra di ricerca
  $('.covers').html('');                                //gli dico che tutto quello che c'e' nella mia ul covers deve diventare vuoto
  $('#query').val('');                                  //gli dico di azzerare anche quello che sta dentro input
}


function getMovies(string) {                              //creo funzione che mi prende il film
  var api_key = '6cc4521c525a43f7df9f1050e00499bb';       //inserisco in una variabile la mia api_key
  var url = 'https://api.themoviedb.org/3/search/movie';  //inserisco in una variabile la mia url

  $.ajax({
    url: url ,                                         //metto variabile url api
    method: 'GET',                                    //seleziono il medoto get
    data: {                                           //seleziono i data che prenderemo dalla api
      api_key : api_key,
      query : string ,
      language : 'it-IT'
    },
    success: function (data) {                        //dico cosa deve accadere in caso di successo nella ricerca
      if (data.total_results > 0) {                   //controllo che ci siano risulati
      var films = data.results;
      printFilms(films);                             //in caso di successo deve applicarsi questa funzione
    }else{
      resetSearch();
      printNoResult();                                //in caso non ci sono risulati deve applicarsi questa funzione
    }
  },
    error: function (request , state, errors) {      //dico cosa deve accadere in caso di errore nella ricerca
      console.log(errors);
    }
  }) ;

}


function printNoResult() {
  var source = $('#noresult-template').html();          //creo mio template con handlebars
  var template = Handlebars.compile(source);
  var html = template();                               //creo var htlm e gli dico dove andare a stampaare nel mio html
  $('.covers').append(html);
}

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
