import { NavLink } from "react-router-dom";
import { Analytics } from "../components";

function Home() {
	return (
		<>
			<main>
				<section className="section-hero">
					<div className="container grid grid-two-cols">
						<div className="hero-content">
							<p>We are the World Best Full Stack Developer</p>
							<h1>Welcom to MERN DEVELOPMENT</h1>
							<p>
								Are you ready to take your business to the next level with cutting-edge IT solutions? Look no further! Here, we
								specialize in providing innovative IT services and solutions tailored to meet your unique needs.
							</p>
							<div className="btn btn-group">
								<NavLink to="/contact">
									<button className="btn">Connect Now</button>
								</NavLink>
								<NavLink to="/service">
									<button className="btn btn-secondary">Learn More</button>
								</NavLink>
							</div>
						</div>
						<div className="hero-image">
							<img src="/images/home.png" alt="coding together" width={500} height={500} />
						</div>
					</div>
				</section>
				<Analytics />
				<section className="section-hero">
					<div className="container grid grid-two-cols">
						<div className="hero-image">
							<img src="/images/design.png" alt="coding together" width={500} height={500} />
						</div>
						<div className="hero-content">
							<p>We are here to help you</p>
							<h1>Get Strated Today</h1>
							<p>
								Ready to take the first step towards a more efficient and secure IT Infrastructure? Contact us today for a free
								consultation and let&apos;s disscuss how Aryan can help your bussiness thrive in the digital age.
							</p>
							<div className="btn btn-group">
								<NavLink to="/contact">
									<button className="btn">Contact Us</button>
								</NavLink>
								<NavLink to="/service">
									<button className="btn btn-secondary">Our Services</button>
								</NavLink>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default Home;
