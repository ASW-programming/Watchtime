export interface WatchlistItem {
	title: string;
	poster: string;
	watchList: boolean;
	seen: boolean;
	checkedSeasons: number[];
	totalSeasons: number;
	type: "movie" | "series";
	imdbID: string;
}

export function getWatchlistStorage(): Record<string, WatchlistItem> {
	const stored = localStorage.getItem("watchlist");
	return stored ? JSON.parse(stored) : {};
}

export function saveWatchlistItem(item: WatchlistItem) {
	const fullList = getWatchlistStorage();
	fullList[item.title] = item;
	localStorage.setItem("watchlist", JSON.stringify(fullList));
}

export function isFullySeen(item: WatchlistItem): boolean {
	if (item.type === "movie") {
		return item.seen;
	}

	return (
		item.totalSeasons > 0 &&
		item.checkedSeasons.length === item.totalSeasons
	);
}

export function currentlyWatching(item: WatchlistItem): boolean {
	return (
		item.type === "series" &&
		item.totalSeasons > 0 &&
		item.checkedSeasons.length > 0 &&
		item.checkedSeasons.length < item.totalSeasons
	);
}
