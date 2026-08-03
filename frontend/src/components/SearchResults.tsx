import { useParams } from "react-router-dom";
import { getTitles } from "../utils/calls.ts";
import { useQuery } from "@tanstack/react-query";

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
			<ul>
				{results?.Search.map((r) => (
					<li key={r.imdbID}>
						{r.Title} ({r.Year})
					</li>
				))}
			</ul>
		</div>
	);
}

export default SearchResults;
