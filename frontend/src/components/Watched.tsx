import { useEffect, useState } from "react";
import {
	getWatchlistStorage,
	isFullySeen,
	WatchlistItem,
} from "../utils/watchlist";

function Watchlist() {
	const [items, setItems] = useState<WatchlistItem[]>([]);

	useEffect(() => {
		const fullList = getWatchlistStorage();
		const seenItems = Object.values(fullList).filter(
			(item) => item.watchList || isFullySeen(item),
		);

		setItems(seenItems);
	}, []);

	return (
		<ul>
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
		</ul>
	);
}

export default Watchlist;
