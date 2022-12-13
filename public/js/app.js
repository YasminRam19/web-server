console.log("Client side javascript file is loaded");

//Select element from the HTML document
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//Add event listener
weatherForm.addEventListener("submit", (e) => {
  //Prevent default behaviour, which is to refresh the browser
  e.preventDefault();
  const location = search.value;

  //Clear values
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //Fetch weather
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
