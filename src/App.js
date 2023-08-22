/** @format */

import { useState } from "react";
import useMovies from "./useMovie";
import useLocalStorage from "./useLocalStorage";
import {
	Box,
	Loader,
	ErrorMessage,
	MovieItemWrap,
	TagAndIcon,
} from "./ReuseComponent";
import { NavBar, NumResult } from "./NavBar";
import { MovieDetail } from "./MovieDetail";
import { WatchSumary, WatchedList } from "./WatchSumary";

export const KEY = "a6ade36e";

export default function App() {
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState();
	const { movies, isLoading, error } = useMovies(query);

	const [watched, setWatched] = useLocalStorage([], "watchedMovie");

	const handleOnAddWatchList = function (watchMovie) {
		console.log(123);
		if (!watched.find((x) => x.imdbID === watchMovie.imdbID))
			addWatchedMovie(watchMovie);
		setSelectedId();
	};

	const addWatchedMovie = function (watchMovie) {
		setWatched((listWatched) => [...listWatched, watchMovie]);
	};

	const removeWatchedMovie = function (id) {
		setWatched((watchedList) =>
			watchedList.filter((item) => item.imdbID !== id),
		);
	};

	return (
		<>
			<NavBar onChange={setQuery}>
				<NumResult length={movies ? movies.length : 0} />
			</NavBar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<ListMovies
							movies={movies}
							setSelectedId={setSelectedId}
							key={"ListMovies"}
						/>
					)}
					{error && <ErrorMessage message={error} key={error} />}
				</Box>
				<Box>
					{!selectedId ? (
						<>
							<WatchSumary watched={watched} />
							<WatchedList
								watched={watched}
								handleDeleteWatched={removeWatchedMovie}
							/>
						</>
					) : (
						<MovieDetail
							selectedId={selectedId}
							setSelectedId={setSelectedId}
							handleOnAddWatchList={handleOnAddWatchList}
							listWatched={watched}
						/>
					)}
				</Box>
			</Main>
		</>
	);
}

//Main
function Main({ children }) {
	return <main className='main'>{children}</main>;
}

export function ListMovies({ movies, setSelectedId }) {
	const handleSelectedId = (id) => {
		setSelectedId(id);
	};

	return (
		<ul className={`list list-movies`}>
			{movies?.map((movie) => (
				<MovieItemWrap
					movie={movie}
					key={movie.imdbID}
					handleOnClick={() => handleSelectedId(movie.imdbID)}>
					<TagAndIcon icon='📅' describe={movie.Year} />
				</MovieItemWrap>
			))}
		</ul>
	);
}
