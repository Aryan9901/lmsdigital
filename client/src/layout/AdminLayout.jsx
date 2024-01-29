import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function AdminLayout() {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<div className="container">
				<h1 style={{ textAlign: "center", width: "fit-content", margin: "0 auto" }}>Loading....</h1>
			</div>
		);
	}

	if (user.isAdmin === false) {
		toast.error("You are trying to access Restricted Route! Try contacting the owner if you think you are authorized to visit this route");
		navigate("/");
	}

	return (
		<>
			<header>
				<div className="container">
					<nav>
						<ul>
							<li>
								<NavLink to="/admin/users">
									<FaUser /> Users
								</NavLink>
							</li>
							<li>
								<NavLink to="/admin/contacts">
									<FaMessage /> Contacts
								</NavLink>
							</li>
							<li>
								<NavLink to="/admin/services">
									<FaRegListAlt /> Services
								</NavLink>
							</li>
							<li>
								<NavLink to="/">
									<FaHome /> Home
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<Outlet />
		</>
	);
}

export default AdminLayout;
