import "../styles/SearchPage.css";
import BaseBtn from "./BaseBtn";
import TextInput from "./TextInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
	const [inputValue, setInputValue] = useState<string>("");
	const navigate = useNavigate();

	return (
		<div className="searchPage">
			<h1>Welcome to Watchtime!</h1>
			<form
				onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
					e.preventDefault();
					if (inputValue.trim()) {
						navigate(`/search/${encodeURIComponent(inputValue)}`);
					}
				}}>
				<div className="searchBar">
					<TextInput
						className="searchInput"
						placeholder="Write search terms here"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setInputValue(e.target.value)
						}
					/>
					<BaseBtn
						className="searchBtn"
						text="Search"
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
}

export default SearchPage;
