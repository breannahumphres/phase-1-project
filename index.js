document.addEventListener("DOMContentLoaded", function () {

const categorySelector = document.querySelector("#game-category");
const gameResult = document.querySelector("#generatedGame");
const resetInput = document.querySelector("#reset");
const generatorForm = document.querySelector("#generatorForm");
const gameDetails = document.querySelector("#gameDetails");
const submitButton = document.querySelector("#submit-button");

generatorForm.addEventListener("submit", function(event) {
	event.preventDefault();
	if (submitButton) { submitButton.disabled = true;}
	const selectedCategory = generatorForm.value;

fetch("http://localhost:3000/freeGames")
	.then(response => response.json())
	.then(freeGames => {
//	console.log(freeGames);
		const filteredGames = freeGames.filter(game => game.category === selectedCategory);
		const randomGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];

		gameResult.textContent = randomGame.title;

		gameDetails.innerHTML = "";
		
		const gameDetailsContainer = document.createElement("div");
		gameDetailsContainer.style.display = "none";

		const gameThumbnail = document.createElement("img");
		gameThumbnail.src = randomGame.thumbnail;
		gameDetailsContainer.append(gameThumbnail);

		const gameDescription = document.createElement("p");
		gameDescription.innerText = "Short Description: " + randomGame.short_description;
		gameDetailsContainer.append(gameDescription);

		const releaseDate = document.createElement("p");
		releaseDate.innerText = "Release Date: " + randomGame.release_date;
		gameDetailsContainer.append(releaseDate);

		const gameLink = document.createElement("a");
		gameLink.href = randomGame.url;
		gameLink.textContent = "Click here to play!";
		gameDetailsContainer.append(gameLink);

		gameDetails.append(gameDetailsContainer);

		gameResult.addEventListener("click", function() {
			if (gameDetailsContainer.style.display === "none") {
				gameDetailsContainer.style.display = "block";
			} else {
				gameDetailsContainer.style.display = "none";
			}

		});
	
	})
	.catch(error => console.error(error))
	.finally(() => {
		if (submitButton) {
		submitButton.disabled = false; }
	});
});

resetInput.addEventListener("input", function(){
	if (resetInput.value.toUpperCase() === "RESET") {
		generatorForm.reset();
		gameResult.textContent = "";
		gameDetails.innerHTML = "";
		resetInput.value = "";
		}
	});


	document.querySelector("#gameSubmission").addEventListener("submit", (event) => {
		event.preventDefault();
		const newGame = {
			"title" : event.target.title.value,
			"thumbnail" : event.target.thumbnail.value,
			"short_description": event.target["short_description"].value,
			"game_url": event.target["game_url"].value,
			"genre": event.target.genre.value,
			"platform": event.target.platform.value,
			"publisher": event.target.publisher.value,
			"developer": event.target.developer.value,
			"release_date": event.target["release_date"].value,
		}
		console.log(newGame);
		//tell fetch to send newpastry to the database i.e. JSON server
		fetch("http://localhost:3000/freeGames", {
			//the type of request we're making (default: GET)
			method: "POST",
			headers: {
				//specify the type of content you're sending 
				"Content-Type": "application/json",
				//specify the type of content you want to receive
				"Accept": "application/json"
			},
		   //body is info being sent along with out request
			body: JSON.stringify(newGame)
		
		})
		.then(response => response.json())
		.then(gameList => {
				const newGameData = document.createElement("li");
				newGameData.textContent = gameList.title;
				document.querySelector("#thanks").append(newGameData);
			console.log(gameList);
		})
		.catch(error => console.error(error));
		event.target.reset();
		});



});



//filter array to match
//choose a random index within that array using math.random *10 (this refers to the index of the array)
//<a> tag to go to website 
//you just see game and if you click or hover you get full details 
//create own api 
// have user input their own free game