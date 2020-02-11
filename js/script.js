$(document).ready(function () {

  $('#query-button').click(function(){                 //gli dico che quando faccio click sul bottone search
    var query = $('#query').val();                     //mi va a prendere il valore inserito nel input
    getMovies(query);                                  //gli dico che deve eseguire la funzione per prendere il film cercato
    resetSearch();
  });
  $("#input").keyup(function(event) {                   //funzione tasto invio al search
    if (event.which == 13) {
      var query = $("#input").val();
      getMovies(query);
      resetSearch();
      getTv(query);
    }
  });
});


// -----------------Funzioni----------------------


function resetSearch() {                                //creo funzione che resetta la barra di ricerca
  $('.films').html('');                                 //gli dico che tutto quello che c'e' nella mia ul films deve diventare vuoto
  $('.tvs').html('');                                   //gli dico che tutto quello che c'e' nella mia ul SERI TV deve diventare vuoto
  $('#query').val('');                                  //gli dico di azzerare anche quello che sta dentro input
}


function getMovies(string) {                              //creo funzione che mi prende il film
  var api_key = '6cc4521c525a43f7df9f1050e00499bb';       //inserisco in una variabile la mia api_key
  var url = 'https://api.themoviedb.org/3/search/movie';  //inserisco in una variabile la mia url

  $.ajax({
    url: url ,                                            //metto variabile url api
    method: 'GET',                                        //seleziono il medoto get
    data: {                                               //seleziono i data che prenderemo dalla api
      api_key : api_key,
      query : string ,
      language : 'it-IT'
    },
    success: function (data) {                        //dico cosa deve accadere in caso di successo nella ricerca
      if (data.total_results > 0) {                   //controllo che ci siano risulati
      var films = data.results;
      printResult('film', films);                             //in caso di successo deve applicarsi questa funzione
    }else{
      printNoResult($('.films'));                     //in caso non ci sono risulati deve applicarsi questa funzione
    }
  },
    error: function (request , state, errors) {      //dico cosa deve accadere in caso di errore nella ricerca
      console.log(errors);
    }
  }) ;

}

function getTv(string) {                                  //creo stessa funzione per prendere le serie tv identico a sopra
  var api_key = '6cc4521c525a43f7df9f1050e00499bb';
  var url = 'https://api.themoviedb.org/3/search/tv';

  $.ajax({
    url: url,
    method: 'GET',
    data: {
      api_key: api_key,
      query: string,
      language: 'it-IT'
    },
    success: function(data) {
      if(data.total_results > 0) {
        var tv = data.results;
        printResult('tv', tv);
      } else {
        printNoResult($('.tvs'));
      }
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}

function printNoResult() {
  var source = $('#noresult-template').html();          //creo mio template con handlebars
  var template = Handlebars.compile(source);
  var html = template();                               //creo var htlm e gli dico dove andare a stampaare nel mio html
  container.append(html);
}

function printResult(type, results) {                      //creo funzione che mi servira' per la ricerca films
    var originalTitle;
    var source = $('#film-template').html();             //creo mio template con handlebars
    var template = Handlebars.compile(source);
    var thisResult = results[i];                         //creo la var thisresult ovvero la var che conterra'il film che cerchero'
  for (var i = 0; i < results.length; i++) {               //creo ciclo for dove gli dico di andare a cercare in tutti i films presenti
    var thisResult = results[i];
    if(type == 'film') {
      originalTitle = thisResult.original_title;
      title = thisResult.title;
      var container = $('.films');
    } else if (type == 'tv'){
      originalTitle = thisResult.original_name;
      title = thisResult.name;
      var container = $('.tvs');
    }
    var context = {                                   //creo var context ovvero tutti i dati che voglio che mi escano nel risultato dopo la ricerca
      title: thisResult.title,                          //questi risulati pendo dal result della mia api e gli dico che al film ricercato devono uscire
      original_title: thisResult.original_title,
      original_language: printLanguage(thisResult.original_language),//gli dico che deve applicare la funzione printLanguage
      vote_average: printStars(thisResult.vote_average)  //gli dico che deve applicare la funzione printStars a questo film
   };
    var html = template(context);                     //creo var htlm e gli dico dove andare a stampaare nel mio html
    container.append(html);

  }

}


function printStars(num) {                            //creo funzione per stamapre le stelline
  num = Math.ceil(num / 2);                           //divido il numero per 2 applico funzione che arrotonda per eccesso
  var string = '';                                    //creo una var vuota che verra' riempita dalle stelle

  for (var i = 1; i <= 5; i++) {                       //mi servono 5 stelle quindi gli dico che deve fare un ciclo di 5 giri
    if (i <= num) {                                    //gli dico che se i e' uguale o minore di num mi stampa la stellina piena
      string += '<i class="fas fa-star"></i>';
    }else {                                             //altrimenti mi stampa la stellina vuota
      string += '<i class="far fa-star"></i>';
    }
  }
  return string                                         //trasformo stampo valore
}



function printLanguage(string) {                                              //creo funzione printLanguage
  var availableLangs = ['it','en','de','es','fr','nl'];                       //creo var che contiene un array
  if (availableLangs.includes(string)) {                                      //creo condizione : se nella var include una stringa nell array
    string = '<img class="lang" src="img/' + string + '.svg">';               //dico che nella stringa deve mettere la bandiera corrispondente
  }
  return string;
}
