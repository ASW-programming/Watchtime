import "../styles/MovieDetails.css";
import "../styles/WaitingState.css";
import "../styles/Stars.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchTitleID } from "../utils/calls";
import BaseBtn from "./BaseBtn";
import { HomeIcon } from "../assets/Icons.tsx";

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
			<div className="movieDetails">
				<div className="informationLayout">
					<h2 className="movieTitle">{selectedTitle.primaryTitle}</h2>
					<div className="movieInformation">
						<img src={imageUrl} className="movieIMG" />
						<div>
							<div className="releaseYears">
								<p className="firstRelease">
									Released: {selectedTitle.startYear}
								</p>
							</div>
							<div className="genreList">
								<span>Genres:</span>
								<ul>
									{selectedTitle.genres.map(
										(genre, index) => (
											<li key={index}>{genre}</li>
										),
									)}
								</ul>
							</div>
							<p>Type: {selectedTitle.type}</p>
							<p>Rating: {rating}</p>
							<p className="plot">Plot: {selectedTitle.plot}</p>
							<p>
								Runtime: {selectedTitle.runtimeSeconds / 60}{" "}
								mins.
							</p>
						</div>
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
				icon={<HomeIcon size="32px" />}
				title="Homepage"
				onClick={() => navigate("/")}
			/>
		</div>
	);
}

export default MovieDetails;
