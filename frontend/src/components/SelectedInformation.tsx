import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { selectedTitle } from "../utils/calls";
import "../styles/SelectedInformation.css";
import Checkbox from "./Checkbox";
import { useState, useEffect } from "react";
import BaseBtn from "./BaseBtn";
import { ReturnIcon } from "../assets/Icons";

interface WatchlistItem {
	title: string;
	poster: string;
	watchList: boolean;
	seen: boolean;
	checkedSeasons: number[];
	type: string;
}

function getWatchlistStorage(): Record<string, WatchlistItem> {
	const stored = localStorage.getItem("watchlist");
	return stored ? JSON.parse(stored) : {};
}

function saveWatchlistItem(item: WatchlistItem) {
	const fullList = getWatchlistStorage();
	fullList[item.title] = item;
	localStorage.setItem("watchlist", JSON.stringify(fullList));
}

function SelectedInformation() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [watchList, setWatchList] = useState(false);
	const [seen, setSeen] = useState(false);
	const [checkedSeasons, setCheckedSeasons] = useState<number[]>([]);

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

	useEffect(() => {
		if (!chosenTitle) return;

		const fullList = getWatchlistStorage();
		const existing = fullList[chosenTitle.Title];

		if (existing) {
			setWatchList(existing.watchList);
			setSeen(existing.seen);
			setCheckedSeasons(existing.checkedSeasons ?? []);
		}
	}, [chosenTitle]);

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

	const isSeries = chosenTitle.Type == "series";

	const allSeasonsSeen =
		isSeries && totalSeasons > 0 && checkedSeasons.length === totalSeasons;

	return (
		<div className="selectedContent">
			<div className="selectedCard">
				<div className="titleCard">
					<img
						className="titlePoster"
						src={
							chosenTitle.Poster !== "N/A"
								? chosenTitle.Poster
								: "https://i.pinimg.com/236x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg"
						}
					/>
					<div className="leftColumn">
						<div className="titleText">
							<h1 className="titleName">{chosenTitle.Title}</h1>
							<p className="titleScore">
								Score: {chosenTitle.imdbRating}
							</p>
							<p className="plot">{chosenTitle.Plot}</p>
						</div>

						<div className="detailsBox">
							<div className="detailsColumn detailsLeft">
								{isSeries && (
									<div className="airtime">
										<p>Started: {startYear}</p>
										<p>Ended: {stopYear || "Ongoing"}</p>
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
													const newWatchList =
														e.target.checked;
													setWatchList(newWatchList);
													saveWatchlistItem({
														title: chosenTitle.Title,
														poster: chosenTitle.Poster,
														watchList: newWatchList,
														seen,
														checkedSeasons,
														type: chosenTitle.Type,
													});
												}}
											/>
											<label
												htmlFor={`checkbox-watchlist`}
											/>
										</div>
									</div>
								</div>

								{!isSeries && (
									<div>
										<div className="checkbox-wrapper-18">
											<div className="round">
												<div className="watchlist">
													<p>Seen:</p>
													<Checkbox
														id={`checkbox-seen`}
														checked={seen}
														onChange={(e) => {
															const newSeen =
																e.target
																	.checked;
															setSeen(newSeen);
															saveWatchlistItem({
																title: chosenTitle.Title,
																poster: chosenTitle.Poster,
																watchList,
																seen: newSeen,
																checkedSeasons,
																type: chosenTitle.Type,
															});
														}}
													/>
													<label
														htmlFor={`checkbox-seen`}
													/>
												</div>
											</div>
										</div>
										<p>Released: {chosenTitle.Year}</p>
									</div>
								)}

								<div className="genresBox">
									<p>Genres:</p>
									{genres.map((g: string, index: number) => (
										<li key={index}>{g}</li>
									))}
								</div>

								<a
									className="imdbLink"
									href={`https://www.imdb.com/title/${chosenTitle.imdbID}`}>
									IMDB
								</a>
							</div>

							{isSeries && (
								<div className="detailsColumn detailsMiddle">
									<p>
										{allSeasonsSeen
											? "Series Completed!"
											: "Not Completed"}
									</p>
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
																	onChange={(
																		e,
																	) => {
																		let newCheckedSeasons: number[];

																		if (
																			e
																				.target
																				.checked
																		) {
																			newCheckedSeasons =
																				[
																					...checkedSeasons,
																					s,
																				];
																		} else {
																			newCheckedSeasons =
																				checkedSeasons.filter(
																					(
																						season,
																					) =>
																						season !==
																						s,
																				);
																		}

																		setCheckedSeasons(
																			newCheckedSeasons,
																		);
																		saveWatchlistItem(
																			{
																				title: chosenTitle.Title,
																				poster: chosenTitle.Poster,
																				watchList,
																				seen,
																				checkedSeasons:
																					newCheckedSeasons,
																				type: chosenTitle.Type,
																			},
																		);
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

							<div className="detailsColumn detailsRight">
								<p>Runtime: {chosenTitle.Runtime}</p>
								<div className="starringBox">
									<p>Starring:</p>
									{actors.map((a: string, index: number) => (
										<li key={index}>{a}</li>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
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
