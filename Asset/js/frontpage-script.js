const apiKey = '';
const url = ''
const form = document.querySelector('form');
let movieInput = document.querySelector('.input-field');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d66aff19dmsh524092da5aa051fp10c216jsn8b26997c98ec',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

  
form.onsubmit = function (e) {
	e.preventDefault();
	console.log('i was clicked');
	console.log(movieInput.value);
	getMovieApi(movieInput);
	
	fetch('https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=tt0944947', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
	window.location.href=('./index2_listing.html')
}

// 
let searchHistory = []
function getMovieApi(movieInput) {
	fetch(`https://online-movie-database.p.rapidapi.com/title/find?q=${movieInput.value}`, options)
	.then(response => response.json())
	 .then(function (data) {
            console.log(data);
            var history = {
                title : movieInput.value,
                movieData : data
            }
            searchHistory.push(history);
			localStorage.setItem('searchHistory', JSON.stringify(searchHistory))

        })
    }    
// retreive previously searched titles from local storage

let moviePoster = document.querySelector('.searchHistoryContainer')
let {movieData, results, image, title } = searchHistory

function init() {
	// Get stored movie titles from localStorage
	let storedMovies = JSON.parse(localStorage.getItem('searchHistory'));
  
	// If movies were retrieved from localStorage, update the searchHistory array to it
	if (storedMovies !== null) {
	  searchHistory = storedMovies;
	  console.log(searchHistory)
	}

	let {movieData, results } = searchHistory;
  // render movie posters of stored movies to the DOM
	 // Clear movie snippets
	 moviePoster.innerHTML = "";
	 let lastSearch = searchHistory[searchHistory.length - 1]
	 for (var i = 0; i < 3; i++) {  
		
	 const searchHistoryContent = `
	  <div class="moviePoster-1 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[0].title}</h4>
				  </div>	
			  <a href="<!--link to modal-->"><img src="${lastSearch.movieData.results[0].image.url}" alt="${lastSearch.movieData.results[0].title} poster style="width:100%""></a>
		  </div>
			  </div>
	  </div>
	  <div class="moviePoster-2 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[1].title}</h4>
				  </div>	
			  <a href="<!--link to modal-->"><img src="${lastSearch.movieData.results[1].image.url}" alt="${lastSearch.movieData.results[1].title} poster style="width:100%""></a>
		  </div>
			  </div>
	  </div>
	  <div class="moviePoster-3 cell-small-4">
		  <div class = "card">
			  <div class = "card-section">
				  <div class="centered-text">
					  <h4>${lastSearch.movieData.results[2].title}</h4>
				  </div>
			  <a href="<!--link to modal-->"><img src="${lastSearch.movieData.results[2].image.url}" alt="${lastSearch.movieData.results[2].title} poster style="width:100%""></a>
		  </div>
			  </div>
	  </div>
		  `
	moviePoster.innerHTML = searchHistoryContent;
	  }
  }
init();