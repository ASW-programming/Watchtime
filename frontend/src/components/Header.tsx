import BaseBtn from "./BaseBtn";
import "../styles/Header.css";
import { HomeIcon } from "../assets/Icons";
import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<div className="headerDiv">
			<header className="header">
				<NavLink to="/" end>
					{({ isActive }) => (
						<BaseBtn
							className={`homeBtn ${isActive ? "active" : ""}`}
							icon={<HomeIcon size="2rem" />}
						/>
					)}
				</NavLink>

				<NavLink to="watchlist">
					{({ isActive }) => (
						<BaseBtn
							className={`watchlistBtn ${isActive ? "active" : ""}`}
							text="Watchlist"
						/>
					)}
				</NavLink>

				<NavLink to="watching">
					{({ isActive }) => (
						<BaseBtn
							className={`watchingBtn ${isActive ? "active" : ""}`}
							text="Watching"
						/>
					)}
				</NavLink>

				<NavLink to="watched">
					{({ isActive }) => (
						<BaseBtn
							className={`watchedBtn ${isActive ? "active" : ""}`}
							text="Watched"
						/>
					)}
				</NavLink>
			</header>
		</div>
	);
}
