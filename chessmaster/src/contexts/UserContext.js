import React, { createContext, useContext, useState } from "react";

// Создаем контекст
const UserContext = createContext();

// Компонент-обертка, который предоставляет токен
function UserProvider({ children }) {
	function parseData(data) {
		try {
			const _data = JSON.parse(data);
			
			if (_data.token === undefined ||
				_data.id === undefined ||
				_data.username === undefined) {
				return { token: "", id: "", username: "" };
			}
		} catch (e) {
			return { token: "", id: "", username: "" };
		}
	}

	const userData = localStorage.getItem("user");

	const { token, id, username } = parseData(userData);

	const [user, setUser] = useState({
		token: token,
		id: id,
		username: username,
	});

	const setUserAndStore = (newUserData) => {
		if (newUserData === null) {
			localStorage.removeItem("user");
			setUser({ token: "", id: "", username: "" });
			return;
		}
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