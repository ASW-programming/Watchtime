import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BaseBtn from "./BaseBtn.tsx";
import { HomeIcon } from "../assets/Icons";
import { searchTitle } from "../utils/calls";
import "../styles/SearchResults.css";

interface Title {
	id: string;
	primaryTitle: string;
	type: string;
	startYear: number;
	primaryImage?: {
		url: string;
	};
	rating?: {
		aggregateRating: number;
	};
}

interface SearchResult {
	titles: Title[];
}

function SearchResults() {
	const { query } = useParams<{ query: string }>();
	const navigate = useNavigate();
	const decodedQuery = decodeURIComponent(query ?? "");

	const {
		data: movie,
		isLoading,
		isError,
	} = useQuery<SearchResult>({
		queryKey: ["movies", decodedQuery],
		queryFn: () => searchTitle(decodedQuery),
		enabled: !!decodedQuery,
	});

	if (isLoading) return <p className="waitingState">Loading...</p>;
	if (isError)
		return (
			<div>
				<p className="waitingState">Something went wrong.</p>
				<BaseBtn
					className="homepageBtn"
					icon={<HomeIcon size="32px" />}
					title="Homepage"
					onClick={() => navigate("/")}
				/>
			</div>
		);

	return (
		<div className="movieContent">
			{movie?.titles?.map((title) => {
				const imageUrl =
					title.primaryImage?.url ??
					"https://clasebcn.com/wp-content/uploads/2020/04/harold-thumb.jpg";
				const rating = title.rating?.aggregateRating ?? "No rating";
				return (
					<Link to={`/${title.type}/${title.id}`} key={title.id}>
						<div className="movieCard">
							<h2>{title.primaryTitle}</h2>
							<img
								className="thumbnail"
								src={imageUrl}
								referrerPolicy="no-referrer"
							/>
							<ul className="infoList">
								<p>Type: {title.type}</p>
								<p>Year: {title.startYear}</p>
								<p>Rating: {rating}/10</p>
							</ul>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default SearchResults;
