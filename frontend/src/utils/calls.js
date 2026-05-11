const IMDB_URL = "https://api.imdbapi.dev";
const limit = 10;

export async function searchTitle(searchQuery) {
	const response = await fetch(
		`${IMDB_URL}/search/titles?query=${searchQuery}&limit=${limit}`,
	);

	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	return await response.json();
}

export async function searchTitleID(searchID) {
	const response = await fetch(`${IMDB_URL}/titles/${searchID}`);

	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	return await response.json();
}
