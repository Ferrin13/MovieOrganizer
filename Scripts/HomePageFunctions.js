/**
 * Created by 13auc on 7/4/2017.
 */
var TABLE_MAX_LENGTH = 15;

function createTable()
{
    for(var i = 0; i < TABLE_MAX_LENGTH; i++)
    {
        var row = document.getElementById("movieTable").insertRow();
        row.className = "movieRow";
        var titleCell = row.insertCell();
        var popularityCell = row.insertCell();
        var overviewCell = row.insertCell();
        var overviewLine = document.createElement("div");
        var overviewDiv = document.createElement("div");
        titleCell.className += " title_column";
        popularityCell.textContent = "N/A";
        popularityCell.className += " popularity_column";

        overviewCell.className += " overview_column";
        overviewLine.className = "overviewLine";
        overviewLine.id = "overviewLine";
        overviewCell.appendChild(overviewLine);
        overviewCell.appendChild(overviewDiv);
        overviewDiv.className = "overviewText";

        row.setAttribute("style", "display: none");
    }
}
/***
 * Updates the graphical content of the table and refreshes the data in movieTableDataList
 * @param basicWrappedRequest
 */
function updateTable(basicWrappedRequest)
{
    movieTableDataList = []; //This hardcoding and use of a global variable likely is not ideal
    for(var i = 0; i < TABLE_MAX_LENGTH; i++)
    {
        var row = document.getElementById("movieTable").rows[i + 1];
        if(i < Object.keys(basicWrappedRequest).length)
        {
            row.cells[0].textContent = basicWrappedRequest[i].title;
            var popularityText = basicWrappedRequest[i].popularity;
            row.cells[1].textContent = popularityText.substr(0, popularityText.indexOf('.') + 3);
            var overviewLine = row.cells[2].firstChild;
            var overviewDiv = row.cells[2].lastChild;
            overviewDiv.textContent = basicWrappedRequest[i].overview;
            overviewLine.textContent = basicWrappedRequest[i].overview;
            row.setAttribute("style", "");  //Unhide if set to invisible
            movieTableDataList.push(basicWrappedRequest[i]);
        }
        else
        {
            row.setAttribute("style", "display: none");
        }
    }
}

function logPath(posterPath)
{
    console.log(posterPath);
}
function addImage(imagePath)
{
    var newImage = document.createElement("img");
    newImage.setAttribute("src", imagePath)
    document.getElementById("demoButton1").appendChild(newImage);

}

function getPosterPath(movieId, imageSize)
{
    return new Promise(
        function(resolve, reject)
        {
            var xml = new XMLHttpRequest();
            xml.onreadystatechange =  function () {
                if (this.readyState == 4 && this.status == 200) {
                    var posterURL = this.responseText;
                    resolve(posterURL);
                }
                else if (this.status != 200 && this.status != 0)
                {
                    reject("REQUEST FAILED");
                }
            };
            xml.open("GET", "http://localhost:80/movieRequests.php?request_type=poster&poster_size=" + imageSize+ "&movie_id=" + movieId, true);
            xml.send();
        }
    )
}

function searchWithInput()
{
    var keyword = document.getElementById("basicSearchField").value;
    searchMovies(keyword, TABLE_MAX_LENGTH).then(updateTable);
}

function searchMovies(keyword, resultLimit)
{
    return new Promise(
        function(resolve, reject)
        {
            var xml = new XMLHttpRequest();
            xml.onreadystatechange =  function () {
                if (this.readyState == 4 && this.status == 200) {
                    var wrappedRequest = new BasicInfoRequestWrapper(this.responseText);
                    resolve(wrappedRequest);
                }
                else if (this.status != 200 && this.status != 0)
                {
                    reject("REQUEST FAILED");
                }
            };
            xml.open("GET", "http://localhost:80/movieRequests.php?request_type=basic&return_limit=" + resultLimit + "&title_keyword=" + keyword, true);
            xml.send();
        }
    )
}