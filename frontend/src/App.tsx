import "./App.css";
import SearchPage from "./components/SearchPage";
import SearchResults from "./components/SearchResults";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SerieDetails from "./components/SelectedInformation.tsx";
import Header from "./components/Header";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<SearchPage />} />
					<Route path="/:id" element={<SerieDetails />} />
					<Route path="/search/:query" element={<SearchResults />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
