/** @format */

//Nav bar
export function NavBar({ children, onChange }) {
	return (
		<nav className='nav-bar'>
			<Logo title='usePopcorn' icon='🍿' className='logo' />
			<Search
				className='search'
				placeholder='Search movies...'
				onChange={onChange}
			/>
			{children}
		</nav>
	);
}
function Logo({ title, icon, className }) {
	return (
		<div className={className}>
			<span role='img'>{icon}</span>
			<h1>{title}</h1>
		</div>
	);
}
function Search({ className, placeholder, onChange }) {
	return (
		<input
			className={className}
			type='text'
			placeholder={placeholder}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}
export function NumResult({ length }) {
	return (
		<p className='num-results'>
			Found <strong>{length}</strong> results
		</p>
	);
}
