/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "../styles/Contact.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = import.meta.VITE_APP_URL;

function Contact() {
	const { user } = useAuth();

	const [contact, setContact] = useState({
		username: "",
		email: "",
		message: "",
	});
	// const [contact, setContact] = useState({
	// 	username: user?.username ? user.username : "",
	// 	email: user?.email ? user.email : "",
	// 	message: "",
	// });

	const [userDataLoaded, setUserDataLoaded] = useState(false);

	useEffect(() => {
		if (user && !userDataLoaded) {
			setContact({
				username: user.username || "",
				email: user.email || "",
				message: "",
			});
			setUserDataLoaded(true);
		}
	}, [user, userDataLoaded]);

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setContact({
			...contact,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${URL}/api/v1/form/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			});
			console.log(response);
			if (response.ok) {
				setContact({
					...contact,
					message: "",
				});
				const data = await response.json();
				console.log(data);
				toast.success(data.message, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "color",
				});
			} else {
				alert("failed");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="section-contact">
			<div className="contact-content container">
				<h1 className="main-heading">Contact Us</h1>
			</div>
			<div className="container grid grid-two-cols">
				<div className="contact-img">
					<img src="/images/support.png" alt="/we are always ready to help" width={500} height={500} />
				</div>
				<div className="contact-form">
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="username">Name</label>
							<input
								required
								type="text"
								placeholder="your good name"
								name="username"
								id="username"
								autoComplete="off"
								value={contact.username}
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
								value={contact.email}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label htmlFor="message">Message</label>
							<textarea
								required
								name="message"
								id="message"
								cols="30"
								rows="5"
								value={contact.message}
								placeholder="Your message"
								onChange={handleInput}
							></textarea>
						</div>
						<div>
							<button type="submit">Send Message</button>
						</div>
					</form>
				</div>
			</div>
			<div className="map container">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.0466888166893!2d77.42128997473314!3d23.168496010868058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43c58456a2eb%3A0xcfc6c3284467d486!2sKalyani%20kunj%20Apartment%20-%203!5e0!3m2!1sen!2sin!4v1704199275984!5m2!1sen!2sin"
					width="600"
					height="450"
					allowfullscreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</section>
	);
}

export default Contact;
