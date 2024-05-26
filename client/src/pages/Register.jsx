/* eslint-disable no-undef */
import { useState } from "react";
import "../styles/Registration.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const URL = import.meta.VITE_APP_URL;

function Register() {
	const [user, setUser] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
	});

	const navigate = useNavigate();
	const { storeTokenInLS } = useAuth();

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${URL}/api/v1/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			if (response.ok) {
				const data = await response.json();
				// store token in local storage
				storeTokenInLS(data.token);

				setUser({ username: "", email: "", phone: "", password: "" });
				toast.success("Registration Success!", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				navigate("/");
			} else {
				const { errDetails } = await response.json();
				toast.error(errDetails.issues[0].message, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			}
		} catch (error) {
			setUser({
				email: "",
				password: "",
				username: "",
				phone: "",
			});
			toast.error("User already registered", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
	};

	return (
		<section>
			<main>
				<div className="section-registration">
					<div className="container grid grid-two-cols">
						<div className="registration-image">
							<img src="/images/register.png" alt="a girl is trying to do registration" width={500} height={500} />
						</div>
						<div className="registration-form">
							<h1 className="main-heading mb-3">Registration Form</h1>
							<br />
							<form onSubmit={handleSubmit}>
								<div>
									<label htmlFor="username">username</label>
									<input
										type="text"
										name="username"
										id="username"
										placeholder="username"
										required
										autoComplete="off"
										value={user.username}
										onChange={handleInput}
									/>
								</div>
								<div>
									<label htmlFor="email">Email</label>
									<input
										type="email"
										name="email"
										id="email"
										placeholder="xyz@gmail.com"
										required
										autoComplete="on"
										value={user.email}
										onChange={handleInput}
									/>
								</div>
								<div>
									<label htmlFor="phone">Phone No.</label>
									<input
										type="number"
										name="phone"
										id="phone"
										placeholder="Enter your contact number"
										required
										autoComplete="off"
										value={user.phone}
										onChange={handleInput}
									/>
								</div>
								<div>
									<label htmlFor="password">Password</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="Enter Password"
										required
										autoComplete="off"
										value={user.password}
										onChange={handleInput}
									/>
								</div>
								<br />
								<button type="submit" className="btn btn-submit">
									Register Now
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
}

export default Register;
