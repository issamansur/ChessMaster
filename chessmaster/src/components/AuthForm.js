import { useRef } from "react";
import { Tabs, Text, TextInput, Button } from "@gravity-ui/uikit";

import ApiManager from "../api/ApiManager";
import { useUser } from "../contexts/UserContext";

import "./AuthForm.css";

const AuthForm = (props) => {
    const { onLogin } = props;
    const [_, setUser] = useUser();
    const loginRef = useRef();
    const passwordRef = useRef();

    async function onLoginClick(e) {
        e.preventDefault();
        const login = loginRef.current.value;
        const password = passwordRef.current.value;
        console.log(login, password);
        const _user = await new ApiManager().login(login, password);
        setUser({
            token: _user?.token,
            id: _user?.userId,
            username: _user?.username,
        
        });
        onLogin();
    }

    return (
        <form 
            className="auth-form"
            onSubmit={async (e) => onLoginClick(e)}
        >
            <Text variant="body-2">Авторизация | Регистрация</Text>
            <Text 
                className="auth-token-modal-title" 
                variant="display-1">
				Авторизация
			</Text>
            <TextInput
                size="l"
                placeholder="Username"
                hint="123"
                controlRef={loginRef}
            />
            <TextInput 
                size="l"
                placeholder="Password"
                type="password"
                controlRef={passwordRef}
            />
            <Button type="submit">Login</Button>
        </form>
    );
};

export default AuthForm;