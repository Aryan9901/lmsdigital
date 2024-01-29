import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home, { Register, Login, About, Contact, Service, Error, AdminUsers, AdminContacts, AdminServices, AdminUpdate, AddService } from "./pages";
import { Footer, Navbar } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./store/auth.jsx";
import Logout from "./pages/Logout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import AdminUpdateService from "./pages/AdminUpdateService.jsx";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/service" element={<Service />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/admin" element={<AdminLayout />}>
						<Route path="users" element={<AdminUsers />} />
						<Route path="users/edit/:id" element={<AdminUpdate />} />
						<Route path="contacts" element={<AdminContacts />} />
						<Route path="services" element={<AdminServices />} />
						<Route path="services/new" element={<AddService />} />
						<Route path="services/edit/:id" element={<AdminUpdateService />} />
					</Route>
					<Route path="*" element={<Error />} />
				</Routes>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				<Footer />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
