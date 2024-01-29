import { NavLink } from "react-router-dom";
import "../styles/Error.css";

function Error() {
	return (
		<section id="error-page">
			<div className="content">
				<h2 className="header">404</h2>
				<h4>Sorry! Page Not Found</h4>
				<p>
					Oops! It seems the page you&apos;re trying to access doesn&apos;t exist. If you believe there&apos;s an issue, feel free to report
					it, and we&apos;ll look into it.
				</p>
				<div className="btns">
					<NavLink to="/">
						<button>Return Home</button>
					</NavLink>
					<NavLink to="/contact">
						<button>Report Problems</button>
					</NavLink>
				</div>
			</div>
		</section>
	);
}

export default Error;
