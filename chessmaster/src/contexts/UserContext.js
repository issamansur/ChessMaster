import React, { createContext, useContext, useState } from "react";

// Создаем контекст
const UserContext = createContext();

// Компонент-обертка, который предоставляет токен
function UserProvider({ children }) {
	const userData = localStorage.getItem("user");

	const { token, id, username } = userData
		? JSON.parse(userData)
		: { token: "", id: "", username: "" };

	const [user, setUser] = useState({
		token: token,
		id: id,
		username: username,
	});

	const setUserAndStore = (newUserData) => {
		localStorage.setItem("user", JSON.stringify(newUserData));
		setUser(newUserData);
	};

	return (
		<UserContext.Provider value={[user, setUserAndStore]}>
			{children}
		</UserContext.Provider>
	);
}

// Хук для использования токена в любом компоненте
function useUser() {
	return useContext(UserContext);
}

export { UserProvider, useUser };