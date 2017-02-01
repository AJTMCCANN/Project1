var recycled_quotes = []
var timer = setInterval(printQuote, 30000);	 //if the user does nothing a new quote is displayed every 30 seconds

function getRandomIndex() {
	var index = Math.floor(Math.random() * quotes.length);
	return index
}

function getRandomQuote() {
	var index = getRandomIndex()
	if (quotes[index] === undefined) {
		quotes = recycled_quotes;			// quotes get put in the recycled_quotes array (defined at top of script) when they are popped
		recycled_quotes = [];				// this 'if' block runs when the array runs out of quotes from 'quotes.pop(index)'
		index = getRandomIndex();			// it resets the 'quotes' array for another runthrough
		quote = quotes.pop(index);
		recycled_quotes.unshift(quote);
		return quote
	} else {
		quote = quotes.pop(index);
		recycled_quotes.unshift(quote);
		return quote
	}
	
}

function printQuote() {
	var quote = getRandomQuote();
	var new_quote = "<p class=\"quote\">" + quote[0] + "</p>"
	var new_source = "<p class=\"source\">" + quote[1] + "<span class=\"citation\">" + quote[2] + "</span><span class = \"year\">" + quote[3] + "</span><span class=\"category\">" + quote[4] + "</span></p>"
	document.getElementById('quote-box').innerHTML = new_quote + new_source

	if ($(".citation").text() === "") { $(".citation").addClass('hideable') };		// these three lines avoid a bunch of trailing commmas that would be
	if ($(".year").text() === "") { $(".year").addClass('hideable') };				// inserted due to the ':before' pseudoelements' css styling if a quote
	if ($(".category").text() === "") { $(".category").addClass('hideable') };		// was missing one of these three properties

	$("body").css("background-color", getRandomColor());	// randomizes the background color

	window.clearInterval(timer);
	timer = setInterval(printQuote, 30000);					// resets the timer when the button is clicked
}

function getRandomColor() {
	var hex = Math.floor(Math.random() * 0xAAAAAA);
	return "#" + ("000000" + hex.toString(16)).substr(-6);
}



document.getElementById('loadQuote').addEventListener("click", printQuote, false);  // event listener to respond to "Show another quote" button clicks
document.getElementById('loadQuote').click(); 								// when user clicks anywhere on the button, the "printQuote" function is called