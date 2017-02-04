	

	var initializeGame = function()
	{
		document.querySelector("#info-text").innerHTML 
										= "Press any key to Get Started";
		document.getElementById('game-inprogress').style.display = "block";
		document.getElementById('game-won').style.display = "none";
		document.getElementById('game-lost').style.display = "none";

		matchedLetters.length = 0;
		unMatchedLetters.length = 0;
		answerWords.length = 0;
		alreadyGuessed = "";

		document.querySelector("#letters-used").innerHTML = "Letters Already Guessed: ";
				
		document.querySelector("#failed-choice-count").innerHTML = 
					"Number of Guesses Remaining #: " + MAX_USER_TRIES;

		randomWords = gameWords[Math.floor(Math.random() * gameWords.length)];
		console.log ("random word is: " + randomWords); 

		for (var i = 0; i < randomWords.length; i++) 
		{
			answerWords[i] = "_";
		}

		document.querySelector('#game').innerHTML = answerWords.join(" ");

		return randomWords.length;
	}

	var gameWords = ["dinosaur", "chimpanzee", "cockroach", "mongoose"];

	var randomWords = [];
	var answerWords = [];

	var MAX_USER_TRIES = 10; 

	var matchedLetters = [];
	var unMatchedLetters = [];

	var remainingLetterCount = initializeGame();
	console.log("remainingLetterCount: " + remainingLetterCount);

	var alreadyGuessed = "";
	var gameover = false;
		
		document.onkeyup = function(event) 
		{
			if(gameover)
			{
				gameover = false;

				remainingLetterCount = initializeGame();	
				return;
			}

			var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

			console.log(userGuess);
			var isMatch = false;

			if(!isUserGuessMatched(userGuess))
			{
				for (var j = 0; j < randomWords.length; j++) 
				{
					if (randomWords[j] === userGuess) 
					{
						answerWords[j] = userGuess;

						matchedLetters.push(userGuess);

						remainingLetterCount--;
						isMatch = true;

						document.querySelector('#game').innerHTML = answerWords.join(" ");

						if (remainingLetterCount == 0) 
						{

							document.querySelector('#game').innerHTML = randomWords;	

							var targetDisplayWon = document.getElementById('game-won');
							targetDisplayWon.style.display = "block";
							targetDisplayWon.innerHTML = "You Won!!";

							document.querySelector("#info-text").innerHTML 
										= "Press any key to restart the game";
							gameover = true;
						}
					} 
				}
			}

			if(!isMatch && !isUserGuessUnMatched(userGuess) && !isUserGuessMatched(userGuess))
			{
				unMatchedLetters.push(userGuess);

				alreadyGuessed += " "  + userGuess;
				document.querySelector("#letters-used").innerHTML 
										= "Letters Already Guessed: " + alreadyGuessed;
				
				document.querySelector("#failed-choice-count").innerHTML = 
							"Number of Guesses Remaining #: " + 
							(MAX_USER_TRIES - unMatchedLetters.length);
			}

			if(unMatchedLetters.length == MAX_USER_TRIES)
			{
				var targetDisplayLost = document.getElementById('game-lost');
				targetDisplayLost.style.display = "block";
				targetDisplayLost.innerHTML = "You lost";

				document.querySelector("#info-text").innerHTML 
										= "Press any key to restart the game";

				gameover = true;
			}
			console.log("unMatchedLetters: " + unMatchedLetters);
			console.log("matchedLetters: " + matchedLetters);


		}

		

		var isUserGuessMatched = function(userGuess)
		{
			for(var i = 0; i < matchedLetters.length; i++)
			{
				if(matchedLetters[i] === userGuess)
				{
					return true;
				}
			}
			return false;
		}

		var isUserGuessUnMatched = function(userGuess)
		{
			for(var i = 0; i < unMatchedLetters.length; i++)
			{
				if(unMatchedLetters[i] === userGuess)
				{
					return true;
				}
			}
			return false;
		}




		

		//For learning purpose
		// var arrayContains = function(array, userGuess)
		// {
		// 	for(var i = 0; i < array.length; i++)
		// 	{
		// 		if(array[i] === userGuess)
		// 		{
		// 			return true;
		// 		}
		// 	}
		// 	return false;
		// }


