// Reference
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//  Config Loading
const showLoading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Initial Variable
let apiQuotes = [];

const newQuotes = () => {
  // Pick random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.innerText = quote.text;
  authorText.innerText = quote.author ? quote.author : 'Unknown';
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
};

// get Quotes from API
const getQuotes = async () => {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    showLoading();
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    complete();
    newQuotes();
  } catch (error) {
    // Catch error
  }
};
// On Load
getQuotes();

// Twitter Quote
const tweetQuote = () => {
  console.log(quoteText, authorText);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

// event listener
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
