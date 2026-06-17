export interface Star {
	id: string;
	displayName: string;
	primaryImage: { url: string };
}

export interface Title {
	id: string;
	primaryTitle: string;
	startYear: number;
	endYear?: number;
	type: string;
	plot: string;
	runtimeSeconds: number;
	genres: string[];
	primaryImage?: { url: string };
	rating?: { aggregateRating: number };
	stars: Star[];
}

export interface Season {
	season: number | string;
}

export interface SeasonsResponse {
	seasons: Season[];
}

export interface Episode {
	id: string;
	title: string;
	season: number;
	episodeNumber: number;
	[key: string]: unknown;
}

export interface EpisodesResponse {
	episodes: Episode[];
}

export interface SearchResult {
	titles: {
		id: string;
		primaryTitle: string;
		type: string;
		startYear: number;
		primaryImage?: { url: string };
		rating?: { aggregateRating: number };
	}[];
}
