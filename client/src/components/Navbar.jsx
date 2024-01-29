import { NavLink, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../store/auth";
import { useEffect } from "react";

function Navbar() {
	const { isLoggedIn } = useAuth();
	const { pathname } = useLocation();

	useEffect(() => {
		// Scroll to the top of the page whenever the pathname changes
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<header className="nav-header">
			<div className="container">
				<div className="logo_brand">
					<NavLink to="/">Aryan Gupta</NavLink>
				</div>
				<nav>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/about">About</NavLink>
						</li>
						<li>
							<NavLink to="/contact">Contact</NavLink>
						</li>
						<li>
							<NavLink to="/service">Services</NavLink>
						</li>
						{isLoggedIn ? (
							<NavLink to="/logout">Logout</NavLink>
						) : (
							<>
								<li>
									<NavLink to="/login">Login</NavLink>
								</li>
								<li>
									<NavLink to="/register">Sign Up</NavLink>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
