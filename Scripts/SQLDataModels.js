/**
 * Created by 13auc on 7/3/2017.
 */
/**
 * This function corresponds exactly to the basic_movie_data table in the database and wraps the data from a raw JSON
 * parsed object that contains a single row of data
 * @param rawJson
 */

function BasicMovieInfoWrapper(rawMovieObjJson)
{
    this.movieId = rawMovieObjJson["MovieId"];
    this.budget = rawMovieObjJson["Budget"];
    this.overview = rawMovieObjJson["Overview"];
    this.popularity = rawMovieObjJson["Popularity"];
    this.revenue = rawMovieObjJson["Revenue"];
    this.status = rawMovieObjJson["Status"];
    this.tagline = rawMovieObjJson["Tagline"];
    this.title = rawMovieObjJson["Title"];
    this.voteAverage = rawMovieObjJson["VoteAverage"];
    this.voteCount = rawMovieObjJson["VoteCount"];
}

/**
 * This function wraps a request for the basic information of several movies, for each movie returned it creates a
 * BasicMovieInfoWrapper.
 * @param rawJson
 */
function BasicInfoRequestWrapper(rawJson)
{
    if(rawJson.includes("NO RESULT"))
    {
        return false;
    }
    var requestObj = JSON.parse(rawJson);
    for(var i = 0; i < Object.keys(requestObj).length; i++)
    {
        this[i] = new BasicMovieInfoWrapper(requestObj[i]);
    }

}