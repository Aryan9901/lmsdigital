import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import "../styles/AdminServices.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminServices() {
	const [services, setServices] = useState([]);
	const { authorizationToken } = useAuth();

	const getServices = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/v1/admin/services`, {
				method: "GET",
				headers: {
					Authorization: authorizationToken,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setServices(data.services.reverse());
			}
		} catch (error) {
			toast.error(error);
		}
	};

	const deleteService = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/api/v1/admin/services/delete/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: authorizationToken,
				},
			});
			const data = await response.json();
			const message = data.message;
			if (response.ok) {
				getServices();
				toast.success(message);
			} else {
				toast.error(message);
			}
		} catch (error) {
			console.error(error);
			toast.error("unknown error");
		}
	};

	useEffect(() => {
		getServices();
	}, []);

	return (
		<section className="services-section">
			<div className="container">
				<h1>services</h1>
			</div>
			<div className="container">
				<Link to={`/admin/services/new`}>
					<button id="addNew">Add new Service</button>
				</Link>
			</div>
			<div className="container admin-users">
				<table>
					<thead>
						<tr>
							<th className="cntth">Service</th>
							<th className="cntth">description</th>
							<th className="cntth">Provider</th>
							<th className="cntth">Price</th>
							<th className="cntth">Delete</th>
						</tr>
					</thead>
					<tbody>
						{services.map((service) => {
							const { service: name, description, provider, price } = service;
							return (
								<tr key={service._id}>
									<td>{name}</td>
									<td>{description}</td>
									<td>{provider}</td>
									<td>{price}</td>
									<td className="btns">
										<Link to={`/admin/services/edit/${service._id}`}>
											<button className="updateLink">Edit</button>
										</Link>
										<button className="deleteLink" onClick={() => deleteService(service._id)}>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default AdminServices;
