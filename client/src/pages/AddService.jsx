import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

function AddService() {
	const [service, setService] = useState({
		service: "",
		provider: "",
		price: "",
		description: "",
	});

	const navigate = useNavigate();
	const { authorizationToken } = useAuth();

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setService({
			...service,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:3000/api/v1/admin/services/add`, {
				method: "POST",
				headers: {
					Authorization: authorizationToken,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(service),
			});
			const data = await response.json();
			const message = data.message;
			if (response.ok) {
				toast.success(message);
				navigate("/admin/services");
			} else {
				toast.error(message);
			}
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<section className="section-contact">
			<div className="contact-content container">
				<h1 className="main-heading">Add Service</h1>
			</div>
			<div className="container grid grid-two-cols">
				<div className="contact-form">
					<form onSubmit={(e) => handleSubmit(e)}>
						<div>
							<label htmlFor="service">Service</label>
							<input
								required
								type="text"
								placeholder="Service name"
								name="service"
								id="service"
								autoComplete="off"
								value={service.service}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label htmlFor="description">Description</label>
							<input
								required
								type="description"
								placeholder="xyz@gmail.com"
								name="description"
								id="description"
								value={service.description}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label htmlFor="provider">Provider</label>
							<input
								required
								type="text"
								placeholder="provider name here"
								name="provider"
								id="provider"
								value={service.provider}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label htmlFor="price">Price</label>
							<input required type="text" placeholder="price" name="price" id="price" value={service.price} onChange={handleInput} />
						</div>
						<div>
							<button type="submit">Add Service</button>
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

export default AddService;
