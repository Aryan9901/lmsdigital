import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate, useParams } from "react-router-dom";

function AdminUpdate() {
	const [user, setUser] = useState({
		username: "",
		phone: "",
		email: "",
		isAdmin: "",
	});

	const navigate = useNavigate();
	const { authorizationToken } = useAuth();
	const { id } = useParams();

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUser({
			...user,
			[name]: value,
		});
	};

	const getSingleUserData = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/api/v1/admin/users/${id}`, {
				method: "GET",
				headers: {
					Authorization: authorizationToken,
				},
			});
			const data = await response.json();
			const message = data.message;
			if (response.ok) {
				setUser(data.user);
			} else {
				toast.error(message);
			}
		} catch (error) {
			toast.error(error);
		}
	};

	const handleSubmit = async (e, id) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:3000/api/v1/admin/users/update/${id}`, {
				method: "PATCH",
				headers: {
					Authorization: authorizationToken,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const data = await response.json();
			const message = data.message;
			if (response.ok) {
				toast.success(message);
				navigate("/admin/users");
			} else {
				toast.error(message);
			}
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		getSingleUserData(id);
	}, []);

	return (
		<section className="section-contact">
			<div className="contact-content container">
				<h1 className="main-heading">Update User Data</h1>
			</div>
			<div className="container grid grid-two-cols">
				<div className="contact-form">
					<form onSubmit={(e) => handleSubmit(e, id)}>
						<div>
							<label htmlFor="username">Name</label>
							<input
								required
								type="text"
								placeholder="your good name"
								name="username"
								id="username"
								autoComplete="off"
								value={user.username}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input
								required
								type="email"
								placeholder="xyz@gmail.com"
								name="email"
								id="email"
								value={user.email}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label htmlFor="phone">Phone</label>
							<input
								required
								type="phone"
								placeholder="+91 - your phone no"
								name="phone"
								id="phone"
								value={user.phone}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label htmlFor="isAdmin">isAdmin</label>
							<input required type="text" name="isAdmin" id="isAdmin" value={user.isAdmin} onChange={handleInput} />
						</div>
						<div>
							<button type="submit">Send Message</button>
						</div>
					</form>
				</div>
				{/* <div className="contact-img">
					<img src="/images/support.png" alt="/we are always ready to help" width={500} height={500} />
				</div> */}
			</div>
		</section>
	);
}

export default AdminUpdate;
