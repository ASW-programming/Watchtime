import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectedTitle } from "../utils/calls";
import "../styles/SelectedInformation.css";
import Checkbox from "./Checkbox";
import { useState } from "react";
import BaseBtn from "./BaseBtn";
import { ReturnIcon } from "../assets/Icons";

function SelectedInformation() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [watchList, setWatchList] = useState(false);
	const [seen, setSeen] = useState(false);

	const {
		data: chosenTitle,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["title", id],
		queryFn: () => selectedTitle(id ?? ""),
		enabled: !!id,
		staleTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});

	const [checkedSeasons, setCheckedSeasons] = useState<number[]>([]);

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
				<div className="titleCard">
					<div className="titleText">
						<h1 className="titleName">{chosenTitle.Title}</h1>
						<p className="titleScore">
							Score: {chosenTitle.imdbRating}
						</p>
						<p className="plot">{chosenTitle.Plot}</p>
					</div>
					<img
						className="titlePoster"
						src={
							chosenTitle.Poster !== "N/A"
								? chosenTitle.Poster
								: "https://i.pinimg.com/236x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg"
						}
					/>
				</div>

				{/* If its a serie */}
				{chosenTitle.Type == "series" && (
					<div className="seriesInfo">
						<div className="airtime">
							<p>Started: {startYear}</p>
							<p>Ended: {stopYear || "Ongoing"}</p>
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
											<div className="checkbox-wrapper-18">
												<div className="round">
													<Checkbox
														id={`checkbox-season-${s}`}
														checked={checkedSeasons.includes(
															s,
														)}
														onChange={(e) => {
															if (
																e.target.checked
															) {
																setCheckedSeasons(
																	(prev) => [
																		...prev,
																		s,
																	],
																);
															} else {
																setCheckedSeasons(
																	(prev) =>
																		prev.filter(
																			(
																				season,
																			) =>
																				season !==
																				s,
																		),
																);
															}
														}}
													/>
													<label
														htmlFor={`checkbox-season-${s}`}></label>
												</div>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				<div className="checkbox-wrapper-18">
					<div className="round">
						<div className="watchlist">
							<p>Add to Watchlist:</p>
							<Checkbox
								id={`checkbox-watchlist`}
								checked={watchList}
								onChange={(e) => {
									setWatchList(e.target.checked);
								}}
							/>
							<label htmlFor={`checkbox-watchlist`} />
						</div>
					</div>
				</div>
				{/* If its a movie */}
				{chosenTitle.Type == "movie" && (
					<div>
						<div className="checkbox-wrapper-18">
							<div className="round">
								<div className="watchlist">
									<p>Seen:</p>
									<Checkbox
										id={`checkbox-seen`}
										checked={seen}
										onChange={(e) => {
											setSeen(e.target.checked);
										}}
									/>
									<label htmlFor={`checkbox-seen`} />
								</div>
							</div>
						</div>
						<p>Released: {chosenTitle.Year}</p>
					</div>
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

				<a href={`https://www.imdb.com/title/${chosenTitle.imdbID}`}>
					IMDB
				</a>
			</div>
			<BaseBtn
				className="returnBtn"
				icon={ReturnIcon()}
				onClick={() => navigate(-1)}
			/>
		</div>
	);
}

export default SelectedInformation;
