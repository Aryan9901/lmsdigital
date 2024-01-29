import { NavLink } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
	return (
		<footer className="container">
			<div className="container grid grid-two-cols">
				<div className="socials">
					<h1>Get in Touch</h1>
					<p>Ecosystem bootstraping learning curvelean startup disruptive. Marketing Long tail disruptive agile development partner.</p>
					<div className="links">
						<NavLink to="https://github.com/Aryan9901">
							<div className="icons">
								<i className="ri-github-line"></i>
							</div>
						</NavLink>
						<NavLink to="https://www.linkedin.com/in/agaryan/">
							<div className="icons">
								<i className="ri-linkedin-fill"></i>
							</div>
						</NavLink>
						<NavLink to="mailto:911aaryan@gmail.com">
							<div className="icons">
								<i className="ri-mail-open-fill"></i>
							</div>
						</NavLink>
						<NavLink to="tel:7415721902">
							<div className="icons">
								<i className="ri-phone-fill"></i>
							</div>
						</NavLink>
					</div>
				</div>
				<div className="featured">
					<div className="grid grid-two-cols">
						<div className="navigations">
							<NavLink to="/">Home</NavLink>
							<NavLink to="/about">About Us</NavLink>
							<NavLink to="/service">Our Services</NavLink>
							<NavLink to="/contact">Contact me</NavLink>
						</div>
						<div className="image">
							<img src="/images/webdev.png" alt="web development image" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
