const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoading() {
    if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
    }
}

function newQuote() {
    showLoading();
    const quote  = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author) {
        authorText.textContent = 'Unknow';
    } else {
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    hideLoading();
}

// Get Quotes From API
async function getQuotes() {
    showLoading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        hideLoading();
    } catch (error) {
        console.log('Whoops, no quote', error);
    }
}

// Tweeter url
function twitterQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
} 
 
  
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', twitterQuote);

// On load
getQuotes();


// LOCAL QUOTES
// function newQuote() {
//     const quote  = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// newQuote();