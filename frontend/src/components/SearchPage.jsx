import { useQuery } from "@tanstack/react-query";
import BaseBtn from "./BaseBtn";
import TextInput from "./TextInput";
import { searchTitle } from "../utils/calls";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon } from "../assets/Icons.jsx";

function SearchPage() {
	const [searchQuery, setSearchQuery] = useState();
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();

	const {
		data: movie,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["movies", searchQuery],
		queryFn: () => searchTitle(searchQuery),
		enabled: !!searchQuery,
	});

	console.log(`This is the data:`, movie);

	if (isLoading) return <p className="waitingState">Loading...</p>;
	if (isError)
		return (
			<div>
				<p className="waitingState"> Something went wrong.</p>
				<BaseBtn
					className="homepageBtn"
					icon={<HomeIcon size="32px" />}
					title="Homepage"
					onClick={() => {
						setSearchQuery(null);
					}}
				/>
			</div>
		);

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setSearchQuery(inputValue);
				}}>
				<TextInput
					placeholder="Write search terms here"
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<BaseBtn text="Click Me" type="submit" />
			</form>
			<div className="movieContent">
				{movie?.titles?.map((title) => {
					const imageUrl =
						title.primaryImage?.url ??
						"https://clasebcn.com/wp-content/uploads/2020/04/harold-thumb.jpg";
					const rating = title.rating?.aggregateRating ?? "No rating";

					return (
						<Link to={`/${title.type}/${title.id}`} key={title.id}>
							<div className="movieCard">
								<h2>{title.primaryTitle}</h2>
								<img
									src={imageUrl}
									style={{ height: "150px", width: "99px" }}
									referrerPolicy="no-referrer"
								/>
								<p>Type: {title.type}</p>
								<p>Year: {title.startYear}</p>
								<p>Rating: {rating}/10</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default SearchPage;
