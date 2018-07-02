var baseURL = "http://content.guardianapis.com/search?api-key=ac86978e-46f4-4706-969a-69176ab65037";
var tabs = [ "business", "football", "US", "politics","sport","US-election"];
var searchQuery;

/*
 * Initialisation function to start the retrieval of data from the service.
 */

function init() {
    showOnly("US-election");
    var business = document.getElementById("businessDiv");
    business.onclick  = function() {

        showOnly("business");

    };
      var football = document.getElementById("footballDiv");
    football.onclick  = function() {

        showOnly("football");

    };
      var US = document.getElementById("USDiv");
    US.onclick  = function() {

        showOnly("US");

    };
      var politics = document.getElementById("politicsDiv");
    politics.onclick  = function() {

        showOnly("politics");

    };
      var sport = document.getElementById("sportDiv");
    sport.onclick  = function() {

        showOnly("sport");

    };
         var USelection = document.getElementById("US-electionDiv");
    USelection.onclick  = function() {

        showOnly("US-election");

    };

}
 var searchButton = document.getElementById("cleaning");
     searchButton.onclick = cleanALL;

function cleanALL(){

 document.getElementById("business").innerHTML = "";
 document.getElementById("football").innerHTML = "";
 document.getElementById("US").innerHTML = "";
 document.getElementById("politics").innerHTML = "";
 document.getElementById("sport").innerHTML = "";
 document.getElementById("US-election").innerHTML = "";
 document.getElementById("add-content").innerHTML = "";
 document.getElementById("addContent").innerHTML = "";
}

/*
 * Show only the given tabs by setting its CSS display attribute to 'block' and
 * the display attribute of all other tabs to 'none'
 */
function showOnly(value) {
  for ( var i in tabs) {
        var currId = tabs[i]
        var currDiv = document.getElementById(currId)
        var button = document.getElementById(currId+"Div");
        if (currId == value) {
            currDiv.style.display = "block";

             button.setAttribute("class", "activeTabButton");

            getSearchValue(value);


        } else {
            currDiv.style.display = "none";

             button.setAttribute("class", "inactiveTabButton");



        }
    }

}
/*
 * Get the value after user's click
 */
function getSearchValue(value){
 switch(value) {
    case "business":
   loadBusiness(value);
   break;
    case "football":
   loadFootball(value);
   break;
   case "US":
   loadUS(value);
   break;
    case "politics":
   loadPolitics(value);
   break;
   case "sport":
   loadSport(value);
   break;
    case "US-election":
   loadUSElection(value);
 }
 }

/*
 * Load the business news data and display it in the corresponding div.
 */
function loadBusiness(searchQuery) {
  document.getElementById("add-content").innerHTML = "";
  document.getElementById("business").innerHTML = "";
   document.getElementById("addContent").innerHTML = "";
    makeJSONPCall(searchQuery, "loadBusinessCallBack");

}
/*
 * Load the Football news data and display it in the corresponding div.
 */
function loadFootball(searchQuery) {
  document.getElementById("add-content").innerHTML = "";
  document.getElementById("football").innerHTML = "";
   document.getElementById("addContent").innerHTML = "";
    makeJSONPCall(searchQuery, "loadFootballCallBack");

}
/*
 * Load the US news data and display it in the corresponding div.
 */
function loadUS(searchQuery) {
  document.getElementById("add-content").innerHTML = "";
  document.getElementById("US").innerHTML = "";
   document.getElementById("addContent").innerHTML = "";
    makeJSONPCall(searchQuery, "loadUSCallBack");

}
function loadPolitics(searchQuery) {
  document.getElementById("add-content").innerHTML = "";
  document.getElementById("politics").innerHTML = "";
   document.getElementById("addContent").innerHTML = "";
    makeJSONPCall(searchQuery, "loadPoliticsCallBack");

}
function loadSport(searchQuery) {
  document.getElementById("add-content").innerHTML = "";
  document.getElementById("sport").innerHTML = "";
   document.getElementById("addContent").innerHTML = "";
    makeJSONPCall(searchQuery, "loadSportCallBack");
}
function loadUSElection(searchQuery) {
  document.getElementById("add-content").innerHTML = "";
  document.getElementById("US-election").innerHTML = "";
   document.getElementById("addContent").innerHTML = "";
    makeJSONPCall(searchQuery, "loadUSElectionCallBack");
}

/*
 * Callback used in the JSONP request. This will be called once the data has
 * been loaded from the server.
 */
function loadBusinessCallBack(data,div) {


   cleanupScript();
   listResults(data,"business");

}
/*
 * Callback used in the JSONP request. This will be called once the data has
 * been loaded from the server.
 */
function loadFootballCallBack(data,div) {
   cleanupScript();
   listResults(data,"football");

}
/*
 * Callback used in the JSONP request. This will be called once the data has
 * been loaded from the server.
 */
function loadUSCallBack(data,div) {


   cleanupScript();
   listResults(data,"US");

}

function loadPoliticsCallBack(data,div) {
   cleanupScript();
   listResults(data,"politics");

}

function loadSportCallBack(data,div) {
   cleanupScript();
   listResults(data,"sport");

}
function loadUSElectionCallBack(data,div) {
    listResults(data,"US-election");
    cleanupScript();
}

/*
 * Make a JSONP call to the given resource with the given additional query part
 * and instructing the callback with the given name to be invoked.
 */
function makeJSONPCall(queryPart, callback) {
    var url = baseURL + "&q=";
    url = url + queryPart+"&order-by=newest"+"&page-size=50";
    url = url + "&show-fields=all"+"&callback=" + callback;
    var scriptElement = document.createElement("script");
    scriptElement.id = "jsonp";
    scriptElement.src = url;
    document.head.appendChild(scriptElement);
}


/*
 * Generic function to render a list of news unde the div element with the
 * given id.
 */
function listResults(data,div) {

    var newsDiv = document.getElementById(div);
    for ( var i = 0; i < 50; i++) {

      list = renderResults(newsDiv ,data.response.results[i]);
    }
}
/*
 * Produces a representation for a news in the given div.
 */
function renderResults(newsDiv ,result) {
    var resultDiv = document.createElement("div");
    resultDiv.setAttribute("class", "movie");
    resultDiv.innerHTML = result.webTitle;
    newsDiv.appendChild(resultDiv);
    renderPoster(newsDiv ,result);
    renderDate(newsDiv ,result);
    rendertrailtext(newsDiv ,result);
    renderUrl(newsDiv ,result);
    rendertwitter(newsDiv ,result)
    var clear = document.createElement("div");
    clear.setAttribute("class","clear");
    resultDiv.appendChild(clear);
}
/*
 * Render the date of the news
 */
function renderDate(newsDiv ,result) {
var urlDiv = document.createElement("div");
  urlDiv.setAttribute("class", "critic" );
  urlDiv.innerHTML = result.webPublicationDate;
  newsDiv.appendChild(urlDiv );
}
/*
 * Render the Url of the news
 */
function renderUrl(newsDiv ,result) {
var urlDiv = document.createElement("div");
  urlDiv.setAttribute("class", "critic");
  urlDiv.innerHTML = "<a href='" + result.webUrl + "'>See More...</a>";
  newsDiv.appendChild(urlDiv );
}
/*
 * Render the poster of the news
 */
function renderPoster(newsDiv ,result) {
  var image = document.createElement("img");
  image.setAttribute("class", "poster");
  if (result.fields.thumbnail!==undefined){
  image.setAttribute("src", result.fields.thumbnail);
  newsDiv.appendChild(image);
}else{
  image.setAttribute("src", "imageindex.png");
  newsDiv.appendChild(image);
}
}
/*
 * Render the trailtext of the news
 */
function rendertrailtext(newsDiv ,result) {
var urlDiv = document.createElement("div");
  urlDiv.setAttribute("class", "newsTitle " );
  urlDiv.innerHTML = result.fields.trailText;
  newsDiv.appendChild(urlDiv );

}
/*
 * Make it is possible to tweet the
 */
function rendertwitter(newsDiv ,result) {
var urlDiv = document.createElement("iframe");
urlDiv.setAttribute("class", "twitter-share-button");
urlDiv.setAttribute("src", "https://platform.twitter.com/widgets/tweet_button.html?size=l&text=" +result.webTitle+result.webUrl);
  newsDiv.appendChild(urlDiv );

}

/*
 * Removes the script element used in the JSONP call from the DOM tree.
 */
function cleanupScript() {
    var scriptElement = document.getElementById("jsonp");
    scriptElement.parentNode.removeChild(scriptElement);

}
window.onload = init;
