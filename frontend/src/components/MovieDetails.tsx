import "../styles/TitleDetails.css";
import "../styles/WaitingState.css";
import "../styles/Stars.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchTitleID } from "../utils/calls";
import BaseBtn from "./BaseBtn";
import { CancelIcon } from "../assets/Icons.tsx";

// Typer för API-datan
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
	type: string;
	plot: string;
	runtimeSeconds: number;
	genres: string[];
	primaryImage?: {
		url: string;
	};
	rating?: {
		aggregateRating: number;
	};
	stars?: Star[];
}

function MovieDetails() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const {
		data: selectedTitle,
		isLoading,
		isError,
	} = useQuery<Title>({
		queryKey: ["specific", id],
		queryFn: () => searchTitleID(id),
	});

	if (isLoading) return <p className="waitingState">Loading...</p>;
	if (isError) return <p className="waitingState">Something went wrong.</p>;
	if (!selectedTitle) return null;

	const imageUrl =
		selectedTitle.primaryImage?.url ??
		"https://clasebcn.com/wp-content/uploads/2020/04/harold-thumb.jpg";

	const rating = selectedTitle.rating?.aggregateRating ?? "No rating";

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
								<span className="boldText">Released:</span>{" "}
								{selectedTitle.startYear}
							</p>
						</div>
						<div className="genreList">
							<span className="boldText">Genres:</span>
							<ul>
								{selectedTitle.genres.map((genre, index) => (
									<li key={index}>{genre}</li>
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
			<div className="starsLayout">
				<h2 className="starsTitle">Starring</h2>
				<ul>
					{(selectedTitle.stars ?? []).map((s) => (
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

export default MovieDetails;
