"use strict";
const button = document.querySelector(".button");
const countriesContainer = document.querySelector(".countries-container");
const renderCountry = function (data, type = "joke") {
  const html = `
    <article class="joke ${type}">
      <h3>${data.setup}</h3>
      <p>${data.punchline}</p>
    </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};
const getCountryData = function () {
  // Fetch random joke
  fetch(`https://official-joke-api.appspot.com/random_joke`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Problem fetching joke (${response.status})`);
      return response.json();
    })
    .then((data) => {
      // Clear the previous joke before adding a new one
      countriesContainer.innerHTML = "";
      renderCountry(data, "neighbour");
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      countriesContainer.innerHTML = `<p>Something went wrong: ${err.message}. Try again later.</p>`;
    });
};
button.addEventListener("click", function () {
  getCountryData();
});
