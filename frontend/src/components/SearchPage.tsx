import { useQuery } from "@tanstack/react-query";
import BaseBtn from "./BaseBtn";
import TextInput from "./TextInput";
import { searchTitle } from "../utils/calls";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "../assets/Icons";

interface Title {
	id: string;
	primaryTitle: string;
	type: string;
	startYear: number;
	primaryImage?: {
		url: string;
	};
	rating?: {
		aggregateRating: number;
	};
}

interface SearchResult {
	titles: Title[];
}

function SearchPage() {
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState<string>("");

	const {
		data: movie,
		isLoading,
		isError,
	} = useQuery<SearchResult>({
		queryKey: ["movies", searchQuery],
		queryFn: () => searchTitle(searchQuery!),
		enabled: !!searchQuery,
	});

	if (isLoading) return <p className="waitingState">Loading...</p>;
	if (isError)
		return (
			<div>
				<p className="waitingState">Something went wrong.</p>
				<BaseBtn
					className="homepageBtn"
					icon={<HomeIcon size="32px" />}
					title="Homepage"
					onClick={() => setSearchQuery(null)}
				/>
			</div>
		);

	return (
		<div>
			<form
				onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
					e.preventDefault();
					setSearchQuery(inputValue);
				}}>
				<TextInput
					placeholder="Write search terms here"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setInputValue(e.target.value)
					}
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
