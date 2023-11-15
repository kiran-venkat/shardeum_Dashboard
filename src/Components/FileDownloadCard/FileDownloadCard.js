import React from "react";
import "./FileDownloadCard.css";
import downloadpng from "../../Pages/EachCollege/undraw_Resume_re_hkth.png";

export const FileDownloadCard = ({ title, click }) => {
	return (
		<a href={click} download={title} className="FileDownloadCard">
			<img src={downloadpng} alt="" />
			<div className="titlebanner">
				<span>{title}</span>
			</div>
		</a>
	);
};
