import "./App.css";
import SearchPage from "./components/SearchPage";
import SearchResults from "./components/SearchResults";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<SearchPage />} />
					{/* <Route path="/movie/:id" element={<MovieDetails />} />
					<Route path="/tvShort/:id" element={<MovieDetails />} />
					<Route path="/tvSeries/:id" element={<SerieDetails />} /> */}
					<Route path="/search/:query" element={<SearchResults />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
