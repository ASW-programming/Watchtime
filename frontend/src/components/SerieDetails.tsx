import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { selectedTitle } from "../utils/calls";

function SerieDetails() {
	const { id } = useParams<{ id: string }>();

	const {
		data: serie,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["title"],
		queryFn: () => selectedTitle(id!),
		enabled: !!id,
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
				<h2>{serie.Title}</h2>
				<p>{serie.Year}</p>
				<p>{serie.Runtime}</p>
				<p>{serie.Genre}</p>
				<p>{serie.Plot}</p>
				<p>{serie.Actors}</p>
			</ul>
		</div>
	);
}

export default SerieDetails;
