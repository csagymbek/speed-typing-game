const timer = document.getElementById("timer");
const quote = document.getElementById("quote");
const typeHere = document.getElementById("type-here");
const randomQuoteURL = "https://api.quotable.io/random";

let start;
const startTimer = () => {
  timer.innerText = 0;
  start = new Date();
  setInterval(() => {
    timer.innerText = Math.floor((new Date() - start) / 1000);
  }, 1000);
};

const getRandomQuote = async (url) => {
  try {
    const { content } = await (await fetch(url)).json();
    quote.innerHTML = "";
    content?.split("").forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char;
      quote.appendChild(span);
    });
  } catch (e) {
    console.log(e.message);
  }
  typeHere.value = null;
  startTimer();
};
getRandomQuote(randomQuoteURL);

typeHere.addEventListener("input", () => {
  const quoteSpanAr = document.querySelectorAll("span");
  const typeHereAr = typeHere.value.split("");
  let correct = true;
  quoteSpanAr?.forEach((span, i) => {
    if (typeHereAr[i] == null) {
      span.classList.remove("correct");
      span.classList.remove("incorrect");
      correct = false;
    } else if (typeHereAr[i] === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      correct = false;
    }
  });
  if (correct) getRandomQuote(randomQuoteURL);
});
