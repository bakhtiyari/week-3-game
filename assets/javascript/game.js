var countriesArray = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
					 "Australia", "Austria", "AzerBaijan", "Bahamas", "Bahrain", "Bangladesh", "Bar Bados",
					  "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
					   "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
					    "Cameroon", "Canada", "Central AfriCan Republic", "Chad", "Chile", "China", "Colombia",
					     "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
					      "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
					       "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji",
					        "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
					         "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
					          "Hungary", "Iceland" , "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
					          "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo",
					           "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
					            "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi",
					             "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
					              "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
					               "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
					                "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman",
					                 "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
					                  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
					                   "Saint Lucia", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia",
					                    "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
					                     "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
					                      "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden",
					                       "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
					                        "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
					                         "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
					                          "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
 					                           "Vatican City", "Venezuela", "Vietnam", "Zambia", "Zimbabwe"];

var numberOfWins = 0;

document.getElementById("startMessage").style.visibility = "hidden";

document.getElementById("playButton").addEventListener("click", myFunction);

function myFunction() {
 
	var list = document.getElementById("ulTemplate");

	while (list.hasChildNodes()) {   
	    list.removeChild(list.firstChild);
	}

	var list = document.getElementById("ulWrongletters");

	while (list.hasChildNodes()) {   
	    list.removeChild(list.firstChild);
	}

	document.getElementById("wonMsg").innerHTML = "";

	document.getElementById("startMessage").style.visibility = "visible";

	var _NUMBER_OF_ALLOWED_GUESSES = 12;

	var currentWord; 

	var numberOfWhiteSpaces = 0;

	var selectedLetter; 

	var rightLetter;

	var wrongLetter;

	var selctedLettersArray = [];

	var rightLetterLocationArray = [];

	var letterIsRepeat = true; //p

	var numberOfRightGuesses = 0;

	var numberOfWrongGuesses = 0;

	var numberOfLosses = 0;

	var wordTemplate = [] ;

	var noMoreLetters = false;

	//----------------------------------------------------

	currentWord = getARandomWordFromWordsArray (countriesArray)

	getWordsTemplate(currentWord);

	addListItemsWithClassAndID();

	displayNumberOfRemaininGuesses(_NUMBER_OF_ALLOWED_GUESSES);

	document.onkeyup = function(event) {

	    var keyupCharacter = event.keyCode;
	        
	    if (keyupCharacter >= 65 && keyupCharacter <=90 && !noMoreLetters) { // Get the Unicode value

			rightLetterLocationArray = []; // otherwise just keep pushing the selected letters

			selectedLetter = String.fromCharCode(keyupCharacter);	// Convert the value into a character
			
			selctedLettersArray.push(selectedLetter);

			var letterIsRepeat = checkIfSelectedLetterIsRepeat ();

			if (!letterIsRepeat) {

				isSelectedLetterRight(selectedLetter); 
			}
		}
	}

	function isSelectedLetterRight (aLetter) {

		lookForTheLetterInCurrentWord (aLetter);

		if (rightLetterLocationArray.length > 0) {

			rightLetter = aLetter;

			guessedLetterWasRight(rightLetter);
		}

		else {

			wrongLetter = aLetter;

			guessedLetterWasWrong(wrongLetter);		
		} 
	}

	function guessedLetterWasRight(theRightLetter) {

		numberOfRightGuesses += rightLetterLocationArray.length;

		displayRightLetter(theRightLetter);

		if ((numberOfRightGuesses + numberOfWhiteSpaces) === currentWord.length) {

			numberOfWins++;

			refreshNumberOfWins(numberOfWins);

			displayYouWon();

			noMoreLetters = true;

			document.getElementById("startMessage").style.visibility = "hidden";
		} 
	}

	function guessedLetterWasWrong(theWrongLetter) {

		var numberOfRemainingGuesses;

		numberOfWrongGuesses++;

		dislayTheWrongLetter(theWrongLetter);

		numberOfRemainingGuesses = _NUMBER_OF_ALLOWED_GUESSES - numberOfWrongGuesses;

		displayNumberOfRemaininGuesses(numberOfRemainingGuesses);

		if (numberOfRemainingGuesses === 0) {

			displayYouLost();

			document.getElementById("startMessage").style.visibility = "hidden";
		}
	}

	function getARandomWordFromWordsArray (anArray) {

		var numberOfPossibleWords = anArray.length;

		var randNumber = Math.floor(Math.random() * numberOfPossibleWords);

		var randomWord = anArray[randNumber];

		return randomWord;
	}

	function getWordsTemplate(aWord) {

		for (var i = 0; i < aWord.length; i++) {
		 
		  	if (aWord[i] !== " ") {

		  		wordTemplate[i] = "_";
			}
			else {

				wordTemplate[i] = "-";

				numberOfWhiteSpaces++
			}
		}
	}

	function addListItemsWithClassAndID() {
		
		for (var i = 0; i < currentWord.length; i++) {
	 
			var li = document.createElement("LI");

		    var textnode = document.createTextNode(wordTemplate[i]);

		    li.appendChild(textnode);

		    document.getElementById("ulTemplate").appendChild(li);

		    var attClass = document.createAttribute("class");

			attClass.value = "guessedLetterClass";

			var attId = document.createAttribute("id");

			var number = parseInt(i)

			attId.value = number;

			document.getElementsByTagName("LI")[i].setAttributeNode(attClass);

			document.getElementsByTagName("LI")[i].setAttributeNode(attId);
		}
	}

	function checkIfSelectedLetterIsRepeat () {

		var letterIsRepeat = false;

		for (var i = 0; i < selctedLettersArray.length; i++) {
			 
			for (var j = i + 1; j < selctedLettersArray.length; j++) {
				
				if (selctedLettersArray[i] === selctedLettersArray[j]) {

					letterIsRepeat = true;

					selctedLettersArray.pop();
				}
			}
		}

		return letterIsRepeat;
	}

	function lookForTheLetterInCurrentWord (aLetter) {

		for (var i = 0; i < currentWord.length; i++) {
			
			if (currentWord[i].toUpperCase() === aLetter) {

				rightLetterLocationArray.push(i);
			}
		}
	}

	function refreshNumberOfWins(aNumberOfWins) { 
		
		document.getElementById("numWins").innerHTML = numberOfWins;
	}

	function displayYouWon() { 
		
		document.getElementById("wonMsg").innerHTML = "YOU WON";
	}

	function dislayTheWrongLetter(aWrongLetter) { 

		var node = document.createElement("LI");

		    var textnode = document.createTextNode(aWrongLetter);

		    node.appendChild(textnode);

		    document.getElementById("ulWrongletters").appendChild(node);
	}

	function displayYouLost() {  
		 
		document.getElementById("lostMsg").innerHTML = "YOU LOST";

		document.getElementById("theCountry").innerHTML = "The Country Was: " + currentWord;
	}

	function displayRightLetter(aRightLetter) {  

		for (var i = 0; i < rightLetterLocationArray.length; i++) {
		
			document.getElementById(rightLetterLocationArray[i]).innerHTML = aRightLetter;
		}
	}

	function displayNumberOfRemaininGuesses(aNumber) {

		document.getElementById("remainingGuesses").innerHTML = aNumber;	
	}
}

