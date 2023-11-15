import React from "react";
import "./SideNav.css";
import { ImStatsDots } from "react-icons/im";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

export const SideNav = () => {
	return (
		<div className="sidenav">
			<div
				className="sidenavtitle"
				// onClick={() => {
				// 	navigate("/");
				// }}
			>
				<a href="/">Shardeum Dashboard</a>
				{/* <SiMatrix /> */}
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
				<a
					href="/fillednotfilled"
					className="sidenavitems"
					// onClick={() => {
					// 	navigate("/fillednotfilled");
					// }}
				>
					<IoIosCheckmarkCircle className="sidenavicons" />
					<p>Filled and Not Filled</p>
				</a>
				{/* <div className="sidenavitems">
					<AiOutlineSearch className="sidenavicons" />
					<p>Search & Status</p>
				</div> */}
			</div>
		</div>
	);
};
