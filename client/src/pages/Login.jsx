/* eslint-disable no-undef */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

function Login() {
	const [user, setUser] = useState({
		email: "",
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
			const response = await fetch(`http://localhost:3000/api/v1/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			if (response.ok) {
				const data = await response.json();
				storeTokenInLS(data.token);
				setUser({ email: "", password: "" });
				toast.success("Login Success!", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "color",
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
			});
			toast.error("Invalid Credentials", {
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
							<img src="/images/login.png" alt="a girl is trying to do registration" width={500} height={500} />
						</div>
						<div className="registration-form">
							<h1 className="main-heading mb-3">Login Form</h1>
							<br />
							<form onSubmit={handleSubmit}>
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
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
}

export default Login;
