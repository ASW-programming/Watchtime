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
			<div className="serieDetails">
				<div className="informationLayout">
					<img src={imageUrl} id="showIMG" />
					<div className="serieInformation">
						<h2>{selectedTitle.primaryTitle}</h2>
						<div className="releaseYears">
							<p className="firstRelease">
								Released: {selectedTitle.startYear}
							</p>
						</div>
						<ul className="genreList">
							Genres:{" "}
							{selectedTitle.genres.map((genre, index) => (
								<li key={index}>{genre}</li>
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
				<div className="starsLayout">
					<h3>Stars</h3>
					<ul>
						{(selectedTitle.stars ?? []).map((s) => (
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
				onClick={() => navigate("/")}
			/>
		</div>
	);
}

export default MovieDetails;
