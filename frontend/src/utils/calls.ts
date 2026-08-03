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
	Response: "True" | "False";
	Error?: string;
}

export async function getTitle(title: string): Promise<OmdbMovie> {
	const response = await fetch(
		`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`,
	);

	if (!response.ok) {
		throw new Error("Kunde inte hämta data från OMDb");
	}

	const data: OmdbMovie = await response.json();

	if (data.Response === "False") {
		throw new Error(data.Error || "Ingen film hittades");
	}

	return data;
}
