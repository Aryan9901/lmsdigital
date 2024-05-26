import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/AdminUsers.css";

const URL = import.meta.VITE_APP_URL;

function AdminUsers() {
	const [users, setUsers] = useState([]);
	const { authorizationToken } = useAuth();

	const getAllUsersData = async () => {
		try {
			const response = await fetch(`${URL}/api/v1/admin/users`, {
				method: "GET",
				headers: {
					Authorization: authorizationToken,
				},
			});
			const data = await response.json();
			setUsers(data.users);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteUser = async (id) => {
		try {
			const response = await fetch(`${URL}/api/v1/admin/users/delete/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: authorizationToken,
				},
			});
			const data = await response.json();
			const message = data.message;
			if (response.ok) {
				setUsers(data.users);
				toast.success(message, {
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
				toast.error(message, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "color",
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllUsersData();
	}, []);

	return (
		<section className="admin-user-section">
			<div className="container">
				<h1>Admin User Data</h1>
			</div>
			<div className="container admin-users">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map((currUser) => {
							return (
								<tr key={currUser._id}>
									<td>{currUser.username}</td>
									<td>{currUser.email}</td>
									<td>{currUser.phone}</td>
									<td>
										<Link to={`/admin/users/edit/${currUser._id}`}>
											<button className="updateLink">Edit</button>
										</Link>
									</td>
									<td>
										<button onClick={() => deleteUser(currUser._id)} className="deleteLink">
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

export default AdminUsers;
