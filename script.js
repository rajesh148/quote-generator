const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn = document.querySelector('.new-quote');
const loader= document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote form API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cryptic-coast-68923.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        //If Author is blank then add 'Unknown
        data.quoteAuthor === '' && data.quoteAuthor ? author.innerText = "Unknown": author.innerText = data.quoteAuthor;
        
        //Reduce font size for long quotes
        // data.quoteText > 20 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
        if(data.quoteText > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        
        quoteText.innerText = data.quoteText;
    
        removeLoadingSpinner();

    } catch (error) {
        getQuote();
        
    }
}
//Tweet quotes
function tweetQuote() {
    const quote = quoteText.innerText;
    const _author = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${_author}`;

    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuote();
