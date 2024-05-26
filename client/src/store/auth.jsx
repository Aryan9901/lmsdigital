/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const URL = import.meta.env.VITE_APP_URL;

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [isLoading, setIsLoading] = useState(false);

	const authorizationToken = `Bearer ${token}`;

	const storeTokenInLS = (serverToken) => {
		setToken(serverToken);
		return localStorage.setItem("token", serverToken);
	};

	let isLoggedIn = !!token;

	const LogoutUser = () => {
		setToken("");
		return localStorage.removeItem("token");
	};

	const userAuthentication = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(`${URL}/api/v1/auth/user`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				setIsLoading(false);
				const data = await response.json();
				setUser(data.userData);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		userAuthentication();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		<AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, isLoading, authorizationToken }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const authContextValue = useContext(AuthContext);
	if (!authContextValue) {
		throw new Error("useAuth used outside of the Provider");
	}
	return authContextValue;
};
