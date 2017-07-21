<?php
header("Access-Control-Allow-Origin: *");
/**
 * Created by PhpStorm.
 * User: 13auc
 * Date: 6/25/2017
 * Time: 12:53 AM

*/
$conn;
$connectionActive = false;
function openConnection()
{
    $servername = "localhost";
    $username = "root";
    $password = "mysqlpassword";
    $dbname = "movie_organizer";
    $GLOBALS['conn'] = new mysqli($servername, $username, $password, $dbname);
    if ($GLOBALS['conn']->connect_error) {
        echo "FAILURE";
        die("Connection failed: " . $GLOBALS['conn']->connect_error);
    }
    $GLOBALS['connectionActive'] = true;
}

function getBasicInfo($title, $limit)
{
    $jsonArray = array();

    if(!$GLOBALS['connectionActive'])
    {
        openConnection();
    }

    $sql = "SELECT * FROM basic_movie_data WHERE Title LIKE '%" . $title . "%' ORDER BY Popularity DESC LIMIT " . $limit . " ";
    $result = $GLOBALS['conn']->query($sql);
    if(!$result)
    {
        echo "NO RESULT";
    }
    else {
        while ($row = $result->fetch_assoc()) {
           array_push($jsonArray, $row);
        }
    }

    return $jsonArray;
}

function getPosterPath($movie_id, $poster_size)
{
    if(!$GLOBALS['connectionActive'])
    {
        openConnection();
    }

    $sql = "SELECT BackdropPath FROM all_movie_data WHERE MovieId = " . $movie_id;
    $result = $GLOBALS['conn']->query($sql);
    if(!$result)
    {
        echo "NO RESULT";
    }
    else {
        $row = $result->fetch_assoc();
        $full_path = "http://image.tmdb.org/t/p/" . $poster_size . "/" . $row["BackdropPath"];
        return $full_path;
    }
}

$request_type = $_REQUEST["request_type"];
if($request_type == 'basic')
{
    $title_search_keyword = $_REQUEST["title_keyword"];
    $max_results = $_REQUEST["return_limit"];
    echo json_encode(getBasicInfo($title_search_keyword, $max_results));
}
elseif($request_type == 'poster')
{
    $movie_id = $_REQUEST["movie_id"];
    $poster_size = $_REQUEST["poster_size"];
    echo getPosterPath($movie_id, $poster_size);
}
else
{
    echo ("NOT SUPPORTED");
}


