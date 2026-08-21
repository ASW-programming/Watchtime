import { useEffect, useState } from "react";

interface WatchlistItem {
	title: string;
	poster: string;
	watchList: boolean;
	seen: boolean;
	checkedSeasons: number[];
	type: "movie" | "series";
}

function getWatchlistStorage(): Record<string, WatchlistItem> {
	const stored = localStorage.getItem("watchlist");
	return stored ? JSON.parse(stored) : {};
}

function Watchlist() {
	const [items, setItems] = useState<WatchlistItem[]>([]);

	useEffect(() => {
		const fullList = getWatchlistStorage();
		setItems(Object.values(fullList));
	}, []);

	return (
		<div>
			{items.map((item) => (
				<li key={item.title}>
					<img src={item.poster} alt={item.title} />
					<p>{item.title}</p>
					<p>
						{item.type === "series"
							? `${item.checkedSeasons.length} seasons watched`
							: item.seen
								? "Seen"
								: "Want to see"}
					</p>
				</li>
			))}
		</div>
	);
}

export default Watchlist;
