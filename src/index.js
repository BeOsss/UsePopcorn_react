/** @format */

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />, //{" "}
		{/*<StarRating
	// 		maxRating={5}
	// 		color='#fa5252'
	// 		messages={["Worst", "Bad", "Good", "Better", "Best"]}
	// 	/>
	// 	<StarRating
	// 		maxRating={10}
	// 		color='#dea'
	// 		size={20}
	// 		messages={[
	// 			"Worst",
	// 			"Bad",
	// 			"Good",
	// 			"Better",
	// 			"Best",
	// 			"Worst",
	// 			"Bad",
	// 			"Good",
	// 			"Better",
	// 			"Best",
	// 		]}
	// 		defaultRating={1}
	// 	/>
	// 	<Test></Test> */}
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
