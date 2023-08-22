/** @format */

import { useState } from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
	maxRating: PropTypes.number,
	defaultRating: PropTypes.number,
	size: PropTypes.number,
	color: PropTypes.string,
	messages: PropTypes.array,
	className: PropTypes.string,
	setExternalRating: PropTypes.func,
};

export default function StarRating({
	maxRating = 5,
	color = "black",
	size = 48,
	messages = [],
	defaultRating = 0,
	setExternalRating = () => {},
	className,
}) {
	const [rating, setRating] = useState(defaultRating);
	const [tempRating, setTempRating] = useState(defaultRating);
	let style = {
		container: {
			display: "flex",
			alignItems: "center",
			gap: `${size / 3}px`,
		},
		starContainer: {
			display: "flex",
			gap: `${size / 12}px`,
		},
		star: {
			width: `${size}px`,
			height: `${size}px`,
			display: "block",
			cursor: "pointer",
			color,
		},
		text: {
			lineHeight: "1",
			margin: "0",
			color,
			fontSize: `${size / 1.5}px`,
		},
	};

	function handlingRating(ratingPoint) {
		setRating(ratingPoint);
		setExternalRating(ratingPoint);
	}
	function handlingEnterHover(ratingPoint) {
		return setTempRating(ratingPoint);
	}
	function handlingLeaveHover() {
		return setTempRating(rating);
	}

	return (
		<div style={style.container} className={className}>
			<div
				style={style.starContainer}
				onMouseLeave={() => handlingLeaveHover()}>
				{Array.from({ length: maxRating }).map((_, i) => (
					<Star
						style={style.star}
						size={size}
						key={i}
						isFull={i < tempRating}
						onRate={() => handlingRating(i + 1)}
						onEnterHover={() => handlingEnterHover(i + 1)}
					/>
				))}
			</div>
			<p style={style.text}>
				{messages.length === maxRating && tempRating
					? messages[tempRating - 1]
					: ""}
			</p>
		</div>
	);
}

function Star({ onRate, isFull = false, onEnterHover, style, size }) {
	return (
		<span style={style} onClick={onRate} onMouseEnter={onEnterHover}>
			{isFull ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox={`0 0 20 20`}
					fill={style.color}
					stroke={style.color}>
					<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox={`0 0 24 24`}
					stroke={style.color}>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='{2}'
						d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
					/>
				</svg>
			)}
		</span>
	);
}
