import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const URL = import.meta.VITE_APP_URL;

function Service() {
	const [services, setServices] = useState([]);

	const getServices = async () => {
		try {
			const response = await fetch(`${URL}/api/v1/data/service`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const data = await response.json();
				setServices(data.data.reverse());
			}
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		getServices();
	}, []);

	return (
		<section className="section-services">
			<div className="container">
				<h1 className="main-heading">Services</h1>
			</div>
			<div className="container grid grid-three-col">
				{services.map((card) => {
					const { price, description, provider, service } = card;
					return (
						<div className="card" key={card._id}>
							<div className="card-img">
								<img src="/images/design.png" alt="our services info" height={250} width={250} />
							</div>
							<div className="card-details">
								<div className="price grid grid-two-cols">
									<p>{provider}</p>
									<p>{price}</p>
								</div>
								<h2>{service}</h2>
								<p>{description}</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default Service;
