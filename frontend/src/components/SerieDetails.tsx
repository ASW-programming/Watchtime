import "../styles/TitleDetails.css";
import "../styles/WaitingState.css";
import "../styles/Stars.css";
import "../styles/SerieDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
	searchTitleID,
	searchEpisodeCount,
	searchSeasonCount,
} from "../utils/calls";
import { useState } from "react";
import { CancelIcon } from "../assets/Icons";
import BaseBtn from "./BaseBtn";
import Checkbox from "./Checkbox";

interface Star {
	id: string;
	displayName: string;
	primaryImage: {
		url: string;
	};
}

interface Title {
	primaryTitle: string;
	startYear: number;
	endYear?: number;
	type: string;
	plot: string;
	runtimeSeconds: number;
	genres: string[];
	primaryImage?: { url: string };
	rating?: { aggregateRating: number };
	stars: Star[];
}

interface Season {
	seasons: number;
}

interface Episode {
	id: string;
	title: string;
	season: number;
	episodeNumber: number;
}

interface EpisodesResult {
	episodes: Episode[];
}

type EpisodesBySeason = Record<number, Episode[]>;

function SerieDetails() {
	const { id } = useParams<{ id: string }>();
	const [progress, setProgress] = useState({ current: 0, total: 0 });
	const navigate = useNavigate();

	// Object that keeps ID as a string and seen as bool
	const [seen, setSeen] = useState<
		Record<string, { seen: boolean; title: string }>
	>(() => {
		const saved = localStorage.getItem("seen");
		return saved ? JSON.parse(saved) : {};
	});

	const {
		data: selectedTitle,
		isLoading,
		isError,
	} = useQuery<Title>({
		queryKey: ["specific", id],
		queryFn: () => searchTitleID(id),
		staleTime: Infinity,
	});

	const {
		data: totalSeasons,
		isLoading: isLoadingSeasons,
		isError: isErrorSeasons,
	} = useQuery<Season>({
		queryKey: ["seasons", id],
		queryFn: () => searchSeasonCount(id),
		enabled: selectedTitle?.type === "tvSeries",
		staleTime: Infinity,
	});

	const {
		data: episodes,
		isLoading: isLoadingEpisodes,
		isError: isErrorEpisodes,
	} = useQuery<EpisodesResult>({
		queryKey: ["episodes", id],
		queryFn: () =>
			searchEpisodeCount(
				id,
				totalSeasons!.seasons,
				(current: number, total: number) => {
					setProgress({ current, total });
				},
			),
		enabled: selectedTitle?.type === "tvSeries" && !!totalSeasons,
		staleTime: Infinity,
	});

	const handleChange = (id: string, checked: boolean, title: string) => {
		setSeen((prev) => {
			const updated = { ...prev };
			if (checked) {
				updated[id] = { seen: true, title };
			} else {
				delete updated[id];
			}
			localStorage.setItem("seen", JSON.stringify(updated));
			return updated;
		});
	};

	const markSeasonAsSeen = (eps: Episode[]) => {
		const allSeen = eps.every((ep) => seen[ep.id]?.seen);

		setSeen((prev) => {
			const updated = { ...prev };
			eps.forEach((ep) => {
				updated[ep.id] = { seen: !allSeen, title: ep.title };
			});
			localStorage.setItem("seen", JSON.stringify(updated));
			return updated;
		});
	};

	if (isLoading || isLoadingSeasons)
		return <p className="waitingState">Loading...</p>;
	if (isError || isErrorSeasons)
		return <p className="waitingState">Something went wrong.</p>;
	if (!selectedTitle) return null;

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

	const episodesBySeason: EpisodesBySeason = (
		episodes?.episodes ?? []
	).reduce<EpisodesBySeason>((acc, episode) => {
		const season = episode.season;
		if (!acc[season]) acc[season] = [];
		acc[season].push(episode);
		return acc;
	}, {});

	return (
		<div>
			<div className="titleCard">
				<div
					className="contentLayout"
					style={{
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}>
					<div className="imgOverlay" />
					<h2 className="titleHeading">
						{selectedTitle.primaryTitle}
					</h2>
					<div className="detailsLayout">
						<img src={imageUrl} className="posterIMG" />
						<p className="plot">
							<span className="boldText">Plot:</span>{" "}
							{selectedTitle.plot}
						</p>
						<div className="releaseYears">
							<p className="firstRelease">
								<span className="boldText">
									First released:
								</span>{" "}
								{selectedTitle.startYear}
							</p>
							<p className="latestRelease">
								<span className="boldText">
									Latest release:
								</span>{" "}
								{selectedTitle.endYear}
							</p>
						</div>
						<div className="genreList">
							<span className="boldText">Genres:</span>
							<ul>
								{selectedTitle.genres.map((g, index) => (
									<li key={index}>{g}</li>
								))}
							</ul>
						</div>
						<p>
							<span className="boldText">Rating:</span> {rating}
						</p>
						<p className="runtime">
							<span className="boldText">Runtime:</span>{" "}
							{selectedTitle.runtimeSeconds / 60} mins.
						</p>
					</div>
				</div>
			</div>
			<div className="seasonsLayout">
				{Object.entries(episodesBySeason).map(([season, eps]) => {
					const allSeen = eps.every((ep) => seen[ep.id]?.seen);
					return (
						<div key={season} className="specificSeason">
							<div className="seasonTitle">
								<h3 className="seriesSeason">
									Säsong {season}
								</h3>
								<div className="selectAll">
									<label>Select all</label>
									<Checkbox
										checked={allSeen}
										onChange={() => markSeasonAsSeen(eps)}
									/>
								</div>
							</div>
							<ul className="episodeUList">
								{eps.map((ep) => (
									<li key={ep.id} className="episodeList">
										<div className="titleSeen">
											{ep.episodeNumber}. {ep.title}
											<Checkbox
												checked={
													seen[ep.id]?.seen ?? false
												}
												onChange={(e) =>
													handleChange(
														ep.id,
														e.target.checked,
														ep.title,
													)
												}
											/>
										</div>
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</div>
			<div className="starsLayout">
				<h2 className="starsTitle">Starring</h2>
				<ul>
					{selectedTitle.stars.map((s) => (
						<li key={s.id} className="starsList">
							<img src={s.primaryImage.url} className="starIMG" />
							<p className="starName">{s.displayName}</p>
						</li>
					))}
				</ul>
			</div>
			<BaseBtn
				className="homepageBtn"
				icon={<CancelIcon />}
				title="Homepage"
				onClick={() => navigate(-1)}
			/>
		</div>
	);
}

export default SerieDetails;
