/** @format */

import { useEffect, useState } from "react";
const KEY = "a6ade36e";

export default function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const handleOnChangingSearchInput = function (
			obj = {
				movies: [],
				totalResults: 0,
				isLoading: false,
				error: "",
			},
		) {
			setMovies(obj.movies);
			setIsLoading(obj.isLoading);
			setError(obj.error);
		};

		const fetchMovies = async function () {
			if (!query.length) {
				handleOnChangingSearchInput();
				return;
			}
			try {
				handleOnChangingSearchInput({ isLoading: true });

				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
				);

				if (!res.ok) {
					throw new Error("Can't fetching");
				}
				const data = await res.json();
				if (data.Response === "False") {
					throw new Error(data.Error);
				}
				handleOnChangingSearchInput({
					totalResults: data.totalResults,
					movies: data.Search ? data.Search : [],
				});
			} catch (err) {
				handleOnChangingSearchInput({ error: err.message });
			}
		};

		const delayDebounceFn = setTimeout(() => fetchMovies(), 500);
		return () => clearTimeout(delayDebounceFn);
	}, [query]);

	return { movies, isLoading, error };
}
