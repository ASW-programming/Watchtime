import { useEffect, useState } from "react";
import {
	getWatchlistStorage,
	isFullySeen,
	WatchlistItem,
} from "../utils/watchlist";
import { Link } from "react-router-dom";
import "../styles/UserTracking.css";

function Watchlist() {
	const [items, setItems] = useState<WatchlistItem[]>([]);

	useEffect(() => {
		const fullList = getWatchlistStorage();
		const seenItems = Object.values(fullList).filter((item) =>
			isFullySeen(item),
		);

		setItems(seenItems);
	}, []);

	return (
		<ul className="bigList">
			{items.map((item) => (
				<Link to={`/${item.imdbID}`} className="listLink">
					<li className="listBorder" key={item.title}>
						<img
							className="listPoster"
							src={item.poster}
							alt={item.title}
						/>
						<div className="listText">
							<h2 className="listTitle">{item.title}</h2>
							<p className="listInfo">
								{item.type === "series"
									? `${item.checkedSeasons.length} out of ${item.totalSeasons} watched`
									: item.seen
										? "Seen"
										: ""}
							</p>
						</div>
					</li>
				</Link>
			))}
		</ul>
	);
}

export default Watchlist;
