const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;

if (!API_KEY) {
	throw new Error("VITE_OMDB_API_KEY saknas. Lägg till den i din .env-fil.");
}

interface OmdbMovie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
	Plot?: string;
}

interface OmdbSearchResult {
	Search: OmdbMovie[];
	totalResults: string;
	Response: "True" | "False";
	Error?: string;
}

export async function getTitles(titles: string): Promise<OmdbSearchResult> {
	const response = await fetch(
		`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(titles)}`,
	);

	if (!response.ok) {
		throw new Error("Couldnt fetch from OMDB");
	}

	const data: OmdbSearchResult = await response.json();

	if (data.Response === "False") {
		throw new Error(data.Error || "Ingen film hittades");
	}

	return data;
}

export async function selectedTitle(id: string) {
	const response = await fetch(
		`${BASE_URL}/?apikey=${API_KEY}&i=${encodeURIComponent(id)}`,
	);

	if (!response.ok) {
		throw new Error("Title wasnt found");
	}

	const data = await response.json();

	return data;
}
