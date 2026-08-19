import { Link, useNavigate, useParams } from "react-router-dom";
import { getTitles } from "../utils/calls.ts";
import { useQuery } from "@tanstack/react-query";
import "../styles/SearchResults.css";
import BaseBtn from "./BaseBtn.tsx";
import { ReturnIcon } from "../assets/Icons.tsx";

interface OmdbMovie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

interface OmdbSearchResult {
	Search: OmdbMovie[];
	totalResults: string;
	Response: string;
}

function SearchResults() {
	const { query } = useParams<{ query: string }>();

	const navigate = useNavigate();

	if (!query) {
		return <h1>Nothing was searched</h1>;
	}

	const {
		data: results,
		isLoading,
		isError,
	} = useQuery<OmdbSearchResult>({
		queryKey: ["titles", query],
		queryFn: () => getTitles(query),
		staleTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return (
			<div>
				<h1>Loading</h1>
			</div>
		);
	}
	if (isError) {
		return (
			<div>
				<h1>{isError}</h1>
			</div>
		);
	}

	return (
		<div>
			<ul className="resultList">
				{results?.Search.map((r) => (
					<li key={r.imdbID} className="titleList">
						<Link to={`/${r.imdbID}`} className="titleListLink">
							<img
								className="searchImg"
								src={
									r.Poster !== "N/A"
										? r.Poster
										: "https://i.pinimg.com/236x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg"
								}
							/>

							<p className="searchTitle">
								{r.Title} ({r.Year})
							</p>
						</Link>
					</li>
				))}
			</ul>

			<BaseBtn
				className="returnBtn"
				icon={ReturnIcon()}
				onClick={() => navigate(-1)}
			/>
		</div>
	);
}

export default SearchResults;
