import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { selectedTitle } from "../utils/calls";
import "../styles/SelectedInformation.css";
import Checkbox from "./Checkbox";

function SelectedInformation() {
	const { id } = useParams<{ id: string }>();

	const {
		data: chosenTitle,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["title", id],
		queryFn: () => selectedTitle(id!),
		enabled: !!id,
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

	const years = chosenTitle.Year.split("–");
	const startYear = years[0];
	const stopYear = years[1];

	const genres = chosenTitle.Genre.split(", ");
	const actors = chosenTitle.Actors.split(", ");

	const totalSeasons = Number(chosenTitle.totalSeasons);
	const seasonsStepped: number[] = [];

	for (let i = 1; i <= totalSeasons; i++) {
		seasonsStepped.push(i);
	}

	return (
		<div className="selectedContent">
			<div className="selectedCard">
				<h1>{chosenTitle.Title}</h1>
				<img src={chosenTitle.Poster}></img>
				<p>Score: {chosenTitle.imdbRating}</p>
				<p className="plot">{chosenTitle.Plot}</p>

				{/* If its a serie */}
				{chosenTitle.Type == "series" && (
					<div className="seriesInfo">
						<div className="airtime">
							<p>Started: {startYear}</p>
							<p>Ended: {stopYear}</p>
						</div>

						<table className="seasonTable">
							<thead className="tableHead">
								<tr>
									<th>Season</th>
									<th>Seen</th>
								</tr>
							</thead>

							<tbody>
								{seasonsStepped.map((s) => (
									<tr key={s}>
										<td>S{s}</td>
										<td>
											<Checkbox />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{/* If its a movie */}
				{chosenTitle.Type == "movie" && (
					<p>Released: {chosenTitle.Year}</p>
				)}
				<p>Runtime: {chosenTitle.Runtime}</p>
				<div>
					<p>Genres:</p>
					{genres.map((g: Array<string>, index: number) => (
						<li key={index}>{g}</li>
					))}
				</div>
				<div>
					<p>Starring:</p>
					{actors.map((a: Array<string>, index: number) => (
						<li key={index}>{a}</li>
					))}
				</div>
			</div>
		</div>
	);
}

export default SelectedInformation;
