import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { selectedTitle } from "../utils/calls";

function SelectedInformation() {
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

	const years = serie.Year.split("–");
	const startYear = years[0];
	const stopYear = years[1];

	const genres = serie.Genre.split(", ");

	return (
		<div>
			<ul>
				<h2>{serie.Title}</h2>
				<img src={serie.Poster}></img>
				<p>{serie.Plot}</p>
				<p>Started: {startYear}</p>
				<p>Ended: {stopYear}</p>
				<p>Runtime: {serie.Runtime}</p>
				{genres.map((g: Array<string>, index: number) => (
					<li key={index}>{g}</li>
				))}

				<p>{serie.Actors}</p>
			</ul>
		</div>
	);
}

export default SelectedInformation;
