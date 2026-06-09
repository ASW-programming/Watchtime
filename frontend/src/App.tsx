import "./App.css";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import SerieDetails from "./components/SerieDetails";
import Header from "./components/Header";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<SearchPage />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
					<Route path="/tvShort/:id" element={<MovieDetails />} />
					<Route path="/tvSeries/:id" element={<SerieDetails />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
