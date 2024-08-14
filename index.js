/*async function fetchData() {const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'Sign Up for Key',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
};
fetchData();
*/

fetch("https://www.freetogame.com/api/games?category=shooter", {
    method: "GET", 
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(pvpData => {console.log(pvpData);})
.catch(error => console.error(error));