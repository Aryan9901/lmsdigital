import { NavLink } from "react-router-dom";
import { Analytics } from "../components";
import { useAuth } from "../store/auth";

function About() {
	const { user } = useAuth();

	return (
		<main>
			<section className="section-hero">
				<div className="container grid grid-two-cols">
					<div className="hero-content">
						{user ? <p>Welcome {user.username} to our website</p> : <p>Welcome to our website</p>}
						<h1>Why Choose Us?</h1>
						<p>
							As a dedicated full-stack MERN developer and a passionate learner, I bring a wealth of technical expertise to any project.
							My proficiency in core Java, Git and GitHub, along with my commitment to staying abreast of industry trends, sets me
							apart.
						</p>
						<p>
							Being a student, I possess the adaptability to grasp new concepts quickly and the enthusiasm to contribute effectively to
							your team.
						</p>

						<div className="btn btn-group">
							<NavLink to="/contact">
								<button>Connect Now</button>
							</NavLink>
							<NavLink to="/service">
								<button className="btn btn-secondary">Learn More</button>
							</NavLink>
						</div>
					</div>
					<div className="hero-image">
						<img src="/images/about.png" alt="coding buddies" width={400} height={400} />
					</div>
				</div>
				<Analytics />
				<div className="container grid grid-two-cols">
					<div className="hero-image">
						<img src="/images/about.png" alt="coding buddies" width={400} height={400} />
					</div>
					<div className="hero-content">
						<h1>Why Choose Us?</h1>
						<p>
							Customization is key, and I understand the uniqueness of each business. I pride myself on creating tailored solutions that
							align with specific needs and goals.
						</p>
						<p>
							With a customer-centric approach, I prioritize client satisfaction and ensure top-notch support to address any IT concerns
							that may arise.
						</p>
						<p>Affordability is crucial, and I offer competitive pricing without compromising the quality of services delivered.</p>
						<p>
							You can rely on my commitment to ensuring a reliable and available 24/7 IT environment. Hire me, and let&apos;s build
							something innovative together!
						</p>
						<div className="btn btn-group">
							<NavLink to="/contact">
								<button>Connect Now</button>
							</NavLink>
							<NavLink to="/service">
								<button className="btn btn-secondary">Learn More</button>
							</NavLink>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default About;
