

	var gameWords = ["dinosaur", "chimpanzee", "cockroach", "mongoose"];

	var MAX_USER_TRIES = 10; 

	var randomWords = gameWords[Math.floor(Math.random() * gameWords.length)];

	var matchedLetters = [];
	var unMatchedLetters = [];

	console.log ("random word is: " + randomWords); 

		var answerWords = [];
		for (var i = 0; i < randomWords.length; i++) 
		{
			answerWords[i] = "_";
		}

		document.querySelector('#game').innerHTML = answerWords.join(" ");

		var remainingLetterCount = randomWords.length;
		console.log("remainingLetterCount: " + remainingLetterCount);

		document.onkeyup = function(event) 
		{
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
							// alert("You won!");
							var targetDisplayWon = document.getElementById('game-won');
		
							var youWonDisplay = document.createElement("div");
							youWonDisplay.innerHTML = "YOU WON";
							targetDisplayWon.appendChild(youWonDisplay);
							youWonDisplay.setAttribute("id", "game-won");
							// location.reload();
							
						}
					} 
				}
			}

			if(!isMatch && !isUserGuessUnMatched(userGuess) && !isUserGuessMatched(userGuess))
			{
				unMatchedLetters.push(userGuess);

				document.querySelector("#letters-used").innerHTML += " "  + userGuess;
				document.querySelector("#failed-choice-count").innerHTML = "Choices left:" + (MAX_USER_TRIES - unMatchedLetters.length);
			}

			if(unMatchedLetters.length == MAX_USER_TRIES)
			{
				// alert("You lost :(");
				var targetDisplayLost = document.getElementById('game-lost');
		
				var youLostDisplay = document.createElement("div");
				youLostDisplay.innerHTML = "YOU LOST";
				targetDisplayLost.appendChild(youLostDisplay);
				youLostDisplay.setAttribute("id", "game-lost");
				

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


