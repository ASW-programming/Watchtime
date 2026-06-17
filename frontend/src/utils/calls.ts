import type { Title, SeasonsResponse, SearchResult } from "../types";

const TITLE_URL = "https://api.imdbapi.dev";
const limit = 10;

export interface Episode {
	id: string;
	title: string;
	season: number;
	episodeNumber: number;
	rating?: number;
	[key: string]: unknown;
}

export interface EpisodesResponse {
	episodes: Episode[];
}

export async function searchTitle(searchQuery: string): Promise<SearchResult> {
	const response = await fetch(
		`${TITLE_URL}/search/titles?query=${searchQuery}&limit=${limit}`,
	);
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}
	return response.json() as Promise<SearchResult>;
}

export async function searchTitleID(
	searchID: string | undefined,
): Promise<Title> {
	const response = await fetch(`${TITLE_URL}/titles/${searchID}`);
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}
	return response.json() as Promise<Title>;
}

export async function searchSeasonCount(
	id: string | undefined,
): Promise<SeasonsResponse> {
	const response = await fetch(`${TITLE_URL}/titles/${id}/seasons`);
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}
	return response.json() as Promise<SeasonsResponse>;
}

export async function searchEpisodeCount(
	id: string | undefined,
	seasons: SeasonsResponse["seasons"],
	onProgress?: (current: number, total: number) => void,
): Promise<EpisodesResponse> {
	const allEpisodes: Episode[] = [];

	for (let i = 0; i < seasons.length; i++) {
		const s = seasons[i];
		onProgress?.(i, seasons.length);

		const url = new URL(`${TITLE_URL}/titles/${id}/episodes`);
		url.searchParams.set("pageSize", "50");
		url.searchParams.set("season", String(s.season));

		let retries = 3;
		while (retries > 0) {
			const res = await fetch(url);
			if (res.status === 429) {
				await new Promise<void>((resolve) => setTimeout(resolve, 1000));
				retries--;
				continue;
			}
			if (!res.ok) throw new Error(`HTTP error ${res.status}`);

			const data: EpisodesResponse = await res.json();
			allEpisodes.push(...data.episodes);
			break;
		}

		await new Promise<void>((resolve) => setTimeout(resolve, 300));
	}

	return { episodes: allEpisodes };
}
