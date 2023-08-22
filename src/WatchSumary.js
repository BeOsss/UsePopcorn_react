/** @format */

import { MovieItemWrap, TagAndIcon } from "./ReuseComponent";

///Watch Box
export function WatchSumary({ watched }) {
	const average = (arr) =>
		Math.round(
			arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0) * 100,
		) / 100;
	const movie = {
		imdbRating: average(watched.map((movie) => movie.imdbRating)),
		userRating: average(watched.map((movie) => movie.userRating)),
		runtime: average(watched.map((movie) => movie.runtime)),
	};

	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<TagAndIcon icon='#️⃣' describe={`${watched.length} movies`} />
				<TagAndIcon icon='⭐️' describe={movie.imdbRating} />
				<TagAndIcon icon='🌟' describe={movie.userRating} />
				<TagAndIcon
					icon='⏳'
					describe={movie.runtime ? `${movie.runtime} time` : ""}
				/>
			</div>
		</div>
	);
}
export function WatchedList({ watched, handleDeleteWatched }) {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<MovieItemWrap movie={movie} key={movie.imdbID}>
					<TagAndIcon icon='⭐️' describe={movie.imdbRating} />
					<TagAndIcon icon='🌟' describe={movie.userRating} />
					<TagAndIcon
						icon='⏳'
						describe={movie.runtime ? `${movie.runtime} time` : ""}
					/>
					<button
						className='btn-delete'
						onClick={() => handleDeleteWatched(movie.imdbID)}>
						X
					</button>
				</MovieItemWrap>
			))}
		</ul>
	);
}
