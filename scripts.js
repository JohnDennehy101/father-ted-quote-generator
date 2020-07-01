// Obtaining the body element via querySelector
const bodyEl = document.querySelector("body");
//Creating an img element via the DOM 'createElement' method
const headerImage = document.createElement("img");
//Creates a 'h1' header via the DOM 'createElement' method
const headerText = document.createElement("h1");
//Setting the text content of the h1 element
headerText.textContent = "Father Ted Quote Generator";
//Setting the src of the header image via the 'setAttribute' method
headerImage.setAttribute("src", "header-image.jpg");
//Appending the image to the body element via the 'appendChild' method
bodyEl.appendChild(headerImage);
//Appending the header text to the bocy element via the 'appendChild' method
bodyEl.appendChild(headerText);
//Creating a button element via the DOM 'createElement' method
const button = document.createElement("button");
//Creating a div element via the DOM 'createElement' method
const quoteEl = document.createElement("div");
//Creating another div element via the DOM 'createElement' method
const seriesAndEpisodeEl = document.createElement("div");
//Creating yet another div element via the DOM 'createElement' method
const containerEl = document.createElement("div");
//Creating 3 p elements via the DOM 'createElement' method. Populated with the API response elements which is then displayed in the browser.
const quoteText = document.createElement("p");
const seriesText = document.createElement("p");
const episodeText = document.createElement("p");
//Appending the div containing the series and episode text and episode to the div container element via the 'appendChild' method
containerEl.appendChild(seriesAndEpisodeEl);
//Appending the containerEl div to the body element via the 'appendChild' method
bodyEl.appendChild(containerEl);
//Appending the quote text to the quote element div.
quoteEl.appendChild(quoteText);
//Appends the series and episode text p elements to the div which contains series and episode elements.
seriesAndEpisodeEl.appendChild(seriesText);
seriesAndEpisodeEl.appendChild(episodeText);
//Appends the quoteEl div containing the quoteText p element to the container div element.
containerEl.appendChild(quoteEl);
//Appends the div containing the series and episode text p elements to the container div.
containerEl.appendChild(seriesAndEpisodeEl);
//Adding a class to the containerEl div via the .classList.add method.
containerEl.classList.add("container");
//Adding a class to the seriesAndEpisodeEl div via the .classList.add method.
seriesAndEpisodeEl.classList.add("span-list");
//Appending the button element to the body element.
bodyEl.appendChild(button);

//Proxy URL used to avoid the CORs issue in the browser upon an API request
const proxyurl = "https://cors-anywhere.herokuapp.com/";
//Endpoint for Father Ted API
const url = "https://api.fatherted.irish/quotes/random"; // site that doesn’t send Access-Control-*

//Asnyc function which awaits the fetch call from Father Ted API. Response is then converted to json and returned.
let quoteData = async () => {
  let response = await fetch(proxyurl + url); // https://cors-anywhere.herokuapp.com/https://example.com

  let data = response.json();
  return data;
};
/*
Function to populate the dynamic info on the browser from Father Ted API. Uses .then() to take resolved promise
and map the correct info to the relevant DOM element 
*/
const displayQuoteInformation = () => {
  quoteData().then(function (a) {
    let episode = a.episode;
    let series = a.series;
    let greatQuote = a.quote;

    seriesText.textContent = series;
    quoteText.textContent = greatQuote;
    episodeText.textContent = `Episode: ${episode}`;
  });

  button.textContent = "Random Quote";
  button.id = "generateQuoteButton";
};

//Method is called to display the correct information with a quote to the user.
displayQuoteInformation();
//Click Event listener added to the button so that a new quote is generated and displayed each time the button is clicked.
button.addEventListener("click", () => {
  return quoteData(), displayQuoteInformation();
});
