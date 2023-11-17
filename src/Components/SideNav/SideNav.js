import React from "react";
import "./SideNav.css";
import { ImStatsDots } from "react-icons/im";

export const SideNav = () => {
	return (
		<div className="sidenav">
			<div
				className="sidenavtitle"
				// onClick={() => {
				// 	navigate("/");
				// }}
			>
				<a href="/">Shardeum Admin</a>

			</div>
			<div className="innersidenav">
				<a
					href="/"
					className="sidenavitems"
					// onClick={() => {
					// 	navigate("/");
					// }}
				>
					<ImStatsDots className="sidenavicons" />
					<p>Dashboard</p>
				</a>
				
			
			</div>
		</div>
	);
};
