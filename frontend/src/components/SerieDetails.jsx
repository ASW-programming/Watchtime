import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
	searchTitleID,
	searchEpisodeCount,
	searchSeasonCount,
} from "../utils/calls";
import { useState } from "react";
import { HomeIcon } from "../assets/Icons.jsx";
import BaseBtn from "./BaseBtn.jsx";

function SerieDetails() {
	const { id } = useParams();
	const [loadingProgress, setLoadingProgress] = useState("");
	const [progress, setProgress] = useState({ current: 0, total: 0 });
	const navigate = useNavigate();

	const {
		data: selectedTitle,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["specific", id],
		queryFn: () => searchTitleID(id),
		staleTime: Infinity,
	});

	const {
		data: totalSeasons,
		isLoading: isLoadingSeasons,
		isError: isErrorSeasons,
		error: errorSeasons,
		error: errorEpisodes,
	} = useQuery({
		queryKey: ["seasons", id],
		queryFn: () => searchSeasonCount(id),
		enabled: selectedTitle?.type === "tvSeries",
		staleTime: Infinity,
	});

	// Fetch all Episodes from the series if totalSeasons is finished.
	const {
		data: episodes,
		isLoading: isLoadingEpisodes,
		isError: isErrorEpisodes,
	} = useQuery({
		queryKey: ["episodes", id],
		queryFn: () => {
			return searchEpisodeCount(
				id,
				totalSeasons.seasons,
				(current, total) => {
					setProgress({ current, total });
				},
			);
		},
		enabled: selectedTitle?.type === "tvSeries" && !!totalSeasons,
		staleTime: Infinity,
	});

	if (isLoading || isLoadingSeasons)
		return <p className="waitingState">Loading...</p>;
	if (isError || isErrorSeasons)
		return <p className="waitingState">Something went wrong.</p>;

	const imageUrl =
		selectedTitle.primaryImage?.url ??
		"https://clasebcn.com/wp-content/uploads/2020/04/harold-thumb.jpg";
	const rating = selectedTitle.rating?.aggregateRating ?? "No rating";

	if (isLoadingEpisodes)
		return (
			<div className="progressContainer">
				<p>
					Hämtar säsonger... {progress.current} / {progress.total}
				</p>
				<div className="progressBar">
					<div
						className="progressFill"
						style={{
							width:
								progress.total > 0
									? `${(progress.current / progress.total) * 100}%`
									: "0%",
						}}
					/>
				</div>
			</div>
		);
	if (isErrorEpisodes)
		return <p className="waitingState">Something went wrong.</p>;

	// Add episodes from one big list into separate objects per season.
	const episodesBySeason = episodes.episodes.reduce((acc, episode) => {
		// Gather season number
		const season = episode.season;
		// If the season doesnt exist we create an empty array, otherwise do nothing.
		if (!acc[season]) acc[season] = [];
		// Add episode to the array
		acc[season].push(episode);
		// Return current object for next iteration.
		return acc;
	}, {});

	return (
		<div>
			<div className="serieDetails">
				<div className="informationLayout">
					<img src={imageUrl} id="showIMG" />
					<div className="serieInformation">
						<h2>{selectedTitle.primaryTitle}</h2>
						<div className="releaseYears">
							<p className="firstRelease">
								First released: {selectedTitle.startYear}
							</p>
							<p className="latestRelease">
								Latest release: {selectedTitle.endYear}
							</p>
						</div>
						<ul className="genreList">
							Genres:{" "}
							{selectedTitle.genres.map((g, index) => (
								<li key={index}>{g}</li>
							))}
						</ul>
						<p>Type: {selectedTitle.type}</p>
						<p>Rating: {rating}</p>
						<p className="plot">Plot: {selectedTitle.plot}</p>
						<p>
							Runtime: {selectedTitle.runtimeSeconds / 60} mins.
						</p>
					</div>
				</div>
				<div className="seasonsLayout">
					{Object.entries(episodesBySeason).map(([season, eps]) => (
						<div key={season} className="specificSeason">
							<h3>Säsong {season}</h3>
							<ul>
								{eps.map((ep) => (
									<li key={ep.id} className="episodeList">
										{ep.episodeNumber}. {ep.title}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className="starsLayout">
					<h3>Stars</h3>
					<ul>
						{selectedTitle.stars.map((s) => (
							<li key={s.id} className="starsList">
								<img
									src={s.primaryImage.url}
									className="starIMG"
								/>
								<p className="starName">{s.displayName}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
			<BaseBtn
				className="homepageBtn"
				icon={<HomeIcon size="32px" />}
				title="Homepage"
				onClick={() => {
					navigate("/");
				}}
			/>
		</div>
	);
}

export default SerieDetails;
