/** @format */

import { useState } from "react";

///Reuse component
export function MovieItemWrap({ movie, children, handleOnClick = () => {} }) {
	return (
		<li onClick={() => handleOnClick()}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>{children}</div>
		</li>
	);
}
function OpenButton({ className, state, setState }) {
	return (
		<button className={className} onClick={() => setState((state) => !state)}>
			{state ? "–" : "+"}
		</button>
	);
}
export function TagAndIcon({ icon, describe }) {
	return (
		<p>
			<span>{icon}</span>
			<span>{describe}</span>
		</p>
	);
}
export function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='box'>
			<OpenButton className='btn-toggle' state={isOpen} setState={setIsOpen} />
			{isOpen && children}
		</div>
	);
}
export function Loader() {
	return <p className='loader'>Loading...</p>;
}
export function ErrorMessage({ message }) {
	return (
		<p className='error'>
			<span>❌</span> {message}
		</p>
	);
}
