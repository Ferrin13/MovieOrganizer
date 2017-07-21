/**
 * Wrapper function for discoverMovies, takes a parsed movie json object from a discover request and wraps the data
 * @param {*parsedJsonObject} rawMovieObj 
 */
function discoverMoviePrototype(rawMovieObj)
{
    this.posterPath = rawMovieObj.poster_path;
    this.adult = rawMovieObj.adult;
    this.overview = rawMovieObj.overview;
    this.releaseDate = rawMovieObj.release_date;
    this.genreIds = rawMovieObj.genre_ids;
    this.id = rawMovieObj.id;
    this.originalTitle = rawMovieObj.original_title;
    this.originalLanguage = rawMovieObj.original_language;
    this.title = rawMovieObj.title;
    this.backdropPath = rawMovieObj.backdrop_path;
    this.popularity = rawMovieObj.popularity;
    this.voteCount = rawMovieObj.vote_count;
    this.video = rawMovieObj.video;
    this.voteAverage = rawMovieObj.vote_average;
};

/**
 * Wrapper function for movies gotten with GetMovies, takes a raw jsonfrom a get Movie request and
 * wraps the data. Is setup for using append_to_results=videos,images
 * @param {*parsedJsonObject} rawMovieObj
 */
function getMoviePrototype(rawMovieJson) //Definitely should have some kind of inheritance from DiscoverMoviePrototype
{
    var rawMovieObj = JSON.parse(rawMovieJson);
    this.adult = rawMovieObj.adult;
    this.backdropPath = rawMovieObj.backdrop_path;
    this.belongsToCollection = rawMovieObj.belongs_to_collection;   //Should create wrapper for collections
    this.budget = rawMovieObj.budget;
    this.posterPath = rawMovieObj.poster_path;
    this.overview = rawMovieObj.overview;
    this.releaseDate = rawMovieObj.release_date;
    this.genreIds = rawMovieObj.genre_ids;
    this.id = rawMovieObj.id;
    this.originalTitle = rawMovieObj.original_title;
    this.originalLanguage = rawMovieObj.original_language;
    this.title = rawMovieObj.title;
    this.popularity = rawMovieObj.popularity;
    this.voteCount = rawMovieObj.vote_count;
    this.video = rawMovieObj.video;
    this.voteAverage = rawMovieObj.vote_average;
}

/**
 * Wrapper function for discover requests, takes raw JSON from a discover request and wraps the data. 
 * @param {*rawJsonData} data 
 */
function discoverRequestPrototype(data)
{
    var rawObj = JSON.parse(data);
    this.page = rawObj.page;
    this.results = [];

    var rawResults = rawObj.results;
    for(var i = 0; i < rawResults.length; i++)
    {
         var movie = new discoverMoviePrototype(rawObj.results[i]);
         this.results.push(movie);
    }
        
    this.totalResults = rawObj.total_results;
    this.total_pages = rawObj.total_pages;
}

function errorCB(data) {
    console.log("Error callback: " + data);
};