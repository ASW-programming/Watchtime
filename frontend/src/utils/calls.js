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

export async function searchSeasonCount(id) {
	const response = await fetch(`${IMDB_URL}/titles/${id}/seasons`);
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}
	return await response.json();
}

export async function searchEpisodeCount(id, seasons, onProgress) {
	const allEpisodes = [];

	// Loop every season
	for (const s of seasons) {
		// Update UI with which season its currently being fetched
		onProgress?.(`Hämtar säsong ${s.season} av ${seasons.length}...`);

		// Build correct URL with season and pagesize
		const url = new URL(`${IMDB_URL}/titles/${id}/episodes`);
		url.searchParams.set("pageSize", "50");
		url.searchParams.set("season", s.season);

		// Try three times before giving up
		let retries = 3;
		while (retries > 0) {
			const res = await fetch(url);

			// If rate is being limitied, wait one sec and try again
			if (res.status === 429) {
				onProgress?.(`Rate limited, väntar och försöker igen...`);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				retries--;
				continue;
			}
			if (!res.ok) throw new Error(`HTTP error ${res.status}`);

			// Push episodes from a specific season into a list.
			const data = await res.json();
			allEpisodes.push(...data.episodes);
			break;
		}

		// Wait before we go again.
		await new Promise((resolve) => setTimeout(resolve, 300));
	}

	return { episodes: allEpisodes };
}
