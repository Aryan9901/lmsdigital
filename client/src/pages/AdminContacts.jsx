import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "../styles/AdminContact.css";

function AdminContacts() {
	const [contacts, setContacts] = useState([]);
	const { authorizationToken } = useAuth();

	const getAllContacts = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/v1/admin/contacts", {
				method: "GET",
				headers: {
					Authorization: authorizationToken,
				},
			});
			const data = await response.json();
			if (response.ok) {
				setContacts(data.contacts);
			} else {
				toast.error("database error or Network issue");
			}
		} catch (error) {
			toast.error(error);
		}
	};

	const deleteContact = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/api/v1/admin/contact/delete/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: authorizationToken,
				},
			});
			const data = await response.json();
			const message = data.message;
			if (response.ok) {
				getAllContacts(id);
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
		getAllContacts();
	}, []);

	return (
		<div className="contacts-section">
			<div className="container">
				<h1>Contacts Data</h1>
			</div>
			<div className="container admin-users">
				<table>
					<thead>
						<tr>
							<th className="cntth">Name</th>
							<th className="cntth">Email</th>
							<th className="cntth">Message</th>
							<th className="cntth">Delete</th>
						</tr>
					</thead>
					<tbody>
						{contacts.map((contact) => {
							const { username, email, message } = contact;
							return (
								<tr key={contact._id}>
									<td>{username}</td>
									<td>{email}</td>
									<td>{message}</td>
									<td>
										<button onClick={() => deleteContact(contact._id)} className="deleteLink">
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AdminContacts;
