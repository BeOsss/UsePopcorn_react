/** @format */

import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Loader } from "./ReuseComponent";
import { KEY } from "./App";

export function MovieDetail({
	selectedId,
	setSelectedId,
	listWatched,
	handleOnAddWatchList,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
				);
				const data = await res.json();
				setMovie(data);
				setIsLoading(false);
			}

			if (listWatched.find((x) => x.imdbID === selectedId))
				setMovie(listWatched.filter((x) => x.imdbID === selectedId)[0]);
			else getMovieDetails();
		},
		[selectedId, listWatched],
	);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className='details'>
					<DetailHeader movie={movie}>
						<button className='btn-back' onClick={() => setSelectedId()}>
							{"<"}
						</button>
					</DetailHeader>
					<DetailDescription key={movie.imdbID} movie={movie}>
						{movie.userRating ? (
							<p>
								You rated with movie {movie.userRating} <span>⭐️</span>
							</p>
						) : (
							<Rating
								movie={movie}
								handleOnAddWatchList={handleOnAddWatchList}
							/>
						)}
					</DetailDescription>
				</div>
			)}
		</>
	);
}
function DetailHeader({ movie, children }) {
	return (
		<header>
			{children}
			{movie.Poster !== "N/A" && (
				<img src={movie.Poster} alt='Poster of movie' />
			)}
			<div className='details-overview'>
				<h2>{movie.Title}</h2>
				<p>
					{movie.Released} • {movie.Runtime}
				</p>
				{movie.Actors !== "N/A" && <p>Starring {movie.Actors}</p>}
				{movie.imdbRating !== "N/A" && (
					<p>
						<span>⭐️</span>
						{movie.imdbRating} IMDb rating
					</p>
				)}
			</div>
		</header>
	);
}

function DetailDescription({ movie, children }) {
	return (
		<section>
			<div className='rating'>{children}</div>
			{movie.Plot !== "N/A" && (
				<p>
					<em>{movie.Plot}</em>
				</p>
			)}
			{movie.Actors !== "N/A" && <p>Starring {movie.Actors}</p>}
			{movie.Director !== "N/A" && <p> Directed by {movie.Director}</p>}
		</section>
	);
}

function Rating({ movie, handleOnAddWatchList }) {
	const [userRating, setUserRating] = useState();

	return (
		<>
			<StarRating
				maxRating={10}
				color='rgb(252, 196, 25)'
				defaultRating={userRating}
				size={32}
				setExternalRating={setUserRating}
			/>
			{userRating && (
				<button
					className='btn-add'
					onClick={() => {
						handleOnAddWatchList({
							...movie,
							runtime: movie.Runtime ? movie.Runtime.split(" ")[0] : 0,
							userRating,
						});
					}}>
					+ Add to list
				</button>
			)}
		</>
	);
}
