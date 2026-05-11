import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchTitleID } from "../utils/calls";

function MovieDetails() {
	const { id } = useParams();

	const {
		data: movie,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["movies", id],
		queryFn: () => searchTitleID(id),
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Something went wrong.</p>;
	if (!movie) return null;

	const imageUrl =
		movie.primaryImage?.url ??
		"https://clasebcn.com/wp-content/uploads/2020/04/harold-thumb.jpg";
	const rating = movie.rating?.aggregateRating ?? "No rating";

	return (
		<div>
			<h2>{movie.primaryTitle}</h2>
			<img src={imageUrl} style={{ height: "400px" }}></img>
			<p>First released: {movie.startYear}</p>
			<p>Latest release: {movie.endYear}</p>
			<ul>
				Genres:{" "}
				{movie.genres.map((g, index) => (
					<li key={index}>{g}</li>
				))}
			</ul>
			<p>Rating: {rating}</p>
			<p>Plot: {movie.plot}</p>
			<h3>Stars</h3>
			<ul>
				{movie.stars.map((s) => (
					<div key={s.id}>
						<img
							src={s.primaryImage.url}
							style={{ width: "150px" }}></img>
						<li key={s.id}>{s.displayName}</li>
					</div>
				))}
			</ul>
		</div>
	);
}

export default MovieDetails;
