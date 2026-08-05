import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { selectedTitle } from "../utils/calls";
import "../styles/SelectedInformation.css";

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
		<div className="selectedContent">
			<ul>
				<div>
					<h1>{serie.Title}</h1>
					<img src={serie.Poster}></img>
					<p>Score: {serie.imdbRating}</p>
					<p className="plot">{serie.Plot}</p>
					<div className="airtime">
						<p>Started: {startYear}</p>
						<p>Ended: {stopYear}</p>
					</div>
					<p>Total Seasons: {serie.totalSeasons}</p>
					<p>Runtime: {serie.Runtime}</p>
					{genres.map((g: Array<string>, index: number) => (
						<li key={index}>{g}</li>
					))}

					<p>{serie.Actors}</p>
				</div>
			</ul>
		</div>
	);
}

export default SelectedInformation;
