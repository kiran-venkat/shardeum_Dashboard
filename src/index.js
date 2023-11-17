import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { SideNav } from "./Components/SideNav/SideNav";
import { TopBar } from "./Components/TopBar/TopBar";
import { Eachcollege } from "./Pages/EachCollege/Eachcollege";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseDetailsPage from "./CourseDetailsPage"; // Create a new component for the course details page


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/fillednotfilled/college/:id",
		element: <Eachcollege />
	},
	{
		path: "/course-details/:courseId",
		element: <CourseDetailsPage />
	}
]);



ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<div className="Layout">
			<SideNav />
			<div className="Layout1">
				<TopBar />
				<RouterProvider router={router} />
			</div>
		</div>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
