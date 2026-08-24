import { useEffect, useState } from "react";
import {
	getWatchlistStorage,
	currentlyWatching,
	WatchlistItem,
} from "../utils/watchlist";
import { Link } from "react-router-dom";

function Watching() {
	const [items, setItems] = useState<WatchlistItem[]>([]);

	useEffect(() => {
		const fullList = getWatchlistStorage();
		const seenItems = Object.values(fullList).filter((item) =>
			currentlyWatching(item),
		);

		setItems(seenItems);
	}, []);

	return (
		<ul>
			{items.map((item) => (
				<Link to={`/${item.imdbID}`}>
					<li key={item.title}>
						<img src={item.poster} alt={item.title} />
						<p>{item.title}</p>
						<p>
							{item.type === "series"
								? `${item.checkedSeasons.length} seasons watched of ${item.totalSeasons}`
								: item.seen
									? "Seen"
									: "Want to see"}
						</p>
					</li>
				</Link>
			))}
		</ul>
	);
}

export default Watching;
