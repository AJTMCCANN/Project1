# Project1
Treehouse Full Stack Javascript TechDegree

Well, I found a text file containing a multitude of quotes.  Now I want to load it into a two-dimensional array where each element of the array contains an array with a quote and an attribution inside of it.  Each quote is separated by a line containing nothing but a period.  And each attribution is preceded by a double dash, --.  Hopping onto stackoverflow, the first two (and most highly upvoted) answers to the question, "How do I load the contents of a text file into a javascript variable?" involve AJAX and JQuery, respectively.  I haven't studied either of those yet, but that's ok.  I can create a quick script in Ruby that will take care of this.

	require 'json'
	file = File.open('quotes.txt', "r")
	contents = file.read
	quotes_array = contents.split(/\n\s?\.\s?\n/)
	quotes_array = quotes_array.map do |chunk|
		chunk.split(/\s?--\s?/)
	end
	File.open('cleaned_up_quotes.json', 'w') {|file| file.write(quotes_array.to_json)}

I used the website rubular.com to test my regular expressions to make sure they would work on test strings.  

When I opened the file in my editor (Sublime Text 3) all the JSON appeared on one line.  So I installed a package called Pretty JSON so that I could view it in a human-readable format, and visually confirm that the script had done what I wanted.  I saw that there were newlines all over the place that I wanted to remove, so I went back and adjusted the script, adding the following line in the map function's code block:

	chunk = chunk.gsub(/\n/, "")

Then I added a leading 'var all_quotes =' at the top of the file, saved it as javascript, moved it to the javascript folder, and linked to that script in index.html .  

Upon reloading the page in Chrome I opened the console (CTRL-SHIFT-J), and saw that there was an error.  "Uncaught ReferenceError: printQuote is not defined".  

So, first I define a function that generates a random index of the all_quotes array, then I define a printQuote function that pulls a quote from the array,save, reload, and voila!

After reloading the page a few times, and after a few clicks of the button, cycling through quotes, two things became apparent.  1) The page would always start with the same quote, which isn't even from my list.  2) If a quote was very long, the button would sit on top of and obscure part of the quote. 

Solving the first part involved checking that the button's id is "loadQuote", then writing 

	document.getElementById('loadQuote').click();

at the bottom of the script.js file, and removing the default text from the 'index.html' file. Thus the first quote the user sees is randomized.  

Solving the second part involved adding borders to all of the divs via CSS so I could visualize the structure of the webpage.  Through inspired guessing, I discovered that the 'position: fixed' attribute the quote-box and button were rendering outside the divs in which they were contained.  So, I deleted those properties.  Of course, this introduced some formatting problems, which were resolved by 1) Wrapping the button in a new div, and applying 'text-align: center', 2) Adding 10% padding to the '.container' div.    

Next I cut down the number of quotes substantially, for a few reasons.  One, quality over quantity.  Two, none of the quotes contain attribution, or a year, or a category, and 'undefined' would display in the browser when these quotes were loaded.  Third, a few of the quotes contained '--' in places other than immediately preceding the attribution, and thus my ruby script messed things up a little bit.  Fourth, things were already messed up because the file contained quite a few errors such as spelling mistakes, words concatenated without spaces, and words separated by too much whitespace.  The hand-picked quote that remain will have none of these problems.   

The next thing I did was to review the grading scheme for this project, and ensure that I met all the base objectives, as well as the extra objectives.  

	-Yes, the array of objects is named quotes.  
	-Yes, there are at least 5 quotes.  
	-Yes, there's an extra property (category).  However, to start none of my quotes have citations or years or categories
	associated with them.  So I put empty strings in the json as placeholders for these, so I don't get 'undefined'.  But I do 
	get a couple of commas trailing the attribution, for example, "--Isaac Asimov, , ".  That's because in the css file there 
	exists the following: 

	.citation:before {
	  content: ", ";
	  font-style: normal;
	}
	.year:before {
	  content: ", ";
	  font-style: normal;
	}

	I quickly discovered that pseudo-elements like these are not part of the DOM and therefore can't be altered using jQuery's 
	DOM methods.  I also learned that I can conditionally add a class to these elements, say, 'hideable', then overwrite the CSS 
	by adding 

	.hideable:before {
		content: "";
	}

	-No, getRandomQuote function does not return a duplicate quote until all quotes have been returned once.  But, this was 
	easy to implement.  
	-Yes, printQuote calls the getRandomQuote function, using the template supplied in the project instructions (modified to 
	allow for quotes to have a 'category' property)
	-No, quotes don't change automatically after a certain amount of time passes.  This was a one-liner.  
	-No, the background color doesn't change each time the quote changes.  This was easy to implement.  I just grabbed a 
	hexadecimal color generating javascript function from stackoverflow.  


Treehouse Feedback:  

	-the code that runs through the quote list once completely before repeating a quote, could be more DRY.
	-Some randomly generated background colors are too light for the color of the text.
	-The timer that generates a new quote every 30 seconds, doesn't reset when the user clicks the button.

	All good points.  As for the first, there's only three lines of repeated code.  That's not too much, really.  
	The second and third points have been fixed.  

	Next time I'll also make sure I'm under version control all the way through instead of just at the end.  
