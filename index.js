var apiKey = "f929092fa2c5d337af8590ea505a1e45";
var searchForm = document.getElementById("search-form");
var textInput = document.getElementById("text-input");
var outputDiv = document.getElementById("output");
var searchString = "";

// Form handlers
textInput.onchange = function(e) {
  searchString = e.target.value;
};

searchForm.onsubmit = function(e) {
  e.preventDefault();

  doSearches(searchString)
    .then(function(res) {
      var html = buildHtml(res);
      writeOutput(html);
    })
    .catch(function(err) {
      console.error(err);
    });
};

// Get and format data
function doSearches(searchString) {
  return searchCharacters(searchString).then(function(res) {
    var characters = formatResults(res);

    return searchComics(searchString).then(function(res) {
      var comics = formatResults(res);

      return searchEvents(searchString).then(function(res) {
        var events = formatResults(res);

        return {
          characters: characters,
          comics: comics,
          events: events
        };
      });
    });
  });
}

function formatResults(results) {
  return results.map(function(result) {
    return {
      id: result.id,
      name: result.name || result.title, // Comics have a title, not a name
      description: result.description
    };
  });
}

// Build html
function buildHtml(data) {
  var containerDiv = document.createElement("DIV");

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var thisProp = data[key];
      containerDiv.append(createSectionDiv(key, thisProp));
    }
  }

  return containerDiv;
}

function createSectionDiv(key, data) {
  var sectionTitle = key.charAt(0).toUpperCase() + key.slice(1);

  var sectionDiv = document.createElement("DIV");

  var headline = document.createElement("H1");
  headline.innerText = sectionTitle;

  sectionDiv.append(headline);

  data.forEach(function(d) {
    var hr = document.createElement("hr");

    sectionDiv.append(createUl(d));
    sectionDiv.append(hr);
  });

  return sectionDiv;
}

function createUl(data) {
  var cardUl = document.createElement("UL");

  var nameHeading = document.createElement("li");
  nameHeading.innerText = data.name || "";
  cardUl.append(nameHeading);

  var idUl = document.createElement("LI");
  idUl.innerText = data.id || "";
  cardUl.append(idUl);

  var descUl = document.createElement("LI");
  descUl.innerText = data.description || "";
  cardUl.append(descUl);

  return cardUl;
}
// End build html

// Change the DOM
function writeOutput(el) {
  clearOutputDiv();
  outputDiv.append(el);
}

function clearOutputDiv() {
  while (outputDiv.firstChild) {
    outputDiv.removeChild(outputDiv.firstChild);
  }
}

// Search functions
var searchCharacters = function(searchString) {
  var base = "https://gateway.marvel.com/v1/public/characters";
  var query = "?&apikey=" + apiKey + "&nameStartsWith=" + searchString;
  var url = base + query;

  return fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      return res.data.results;
    });
};

var searchComics = function(searchString) {
  var base = "https://gateway.marvel.com/v1/public/comics";
  var query = "?&apikey=" + apiKey + "&titleStartsWith=" + searchString;
  var url = base + query;

  return fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      return res.data.results;
    });
};

var searchEvents = function(searchString) {
  var base = "https://gateway.marvel.com/v1/public/characters";
  var query = "?&apikey=" + apiKey + "&nameStartsWith=" + searchString;
  var url = base + query;

  return fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      return res.data.results;
    });
};
