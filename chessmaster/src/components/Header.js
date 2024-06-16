import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text, Avatar, TextInput, User, Modal, Icon } from "@gravity-ui/uikit";

import { useUser } from "../contexts/UserContext";

import { Magnifier } from "@gravity-ui/icons";

import './Header.css';
import AuthForm from "./AuthForm";
import UserBadge from "./UserBadge";

const Header = (props) => {
    const navigate = useNavigate();
    const { onSearch } = props;
    const [user, _] = useUser();
    const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);

    function onKeyDownHandler(event) {
        if (event.key === "Enter") {
            onSearch(event.target.value);
        }
    }

    function onLogoClick() {
        navigate("/");
    }

    function onLoginClick() {
        setIsAuthFormOpen(true);
    }

    return (
        <header>
            <div className="header">
                <Text variant="display-1" onClick={onLogoClick}>
                    ChessMaster
                </Text>
                <div className="right-panel">
                    {/*
                    <TextInput
                        startContent={	
                            <Button view="clear" disabled={true} size="s">
                                <Icon data={Magnifier} size={10} />
                            </Button>
                        }
                        style={{ marginRight: "10px" }}
                        placeholder="Search users..."
                        onKeyDown={onKeyDownHandler}
                    />
                    */}
                    { user.token ? (
                        <UserBadge
                            username={user.username}
                            position="right"
                        />
                        
                    ) : (
                        <Button
                            //size="l"
                            view="action"
                            variant="primary"
                            onClick={onLoginClick}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
            <Modal
                open={isAuthFormOpen}
                onClose={() => setIsAuthFormOpen(false)}
            >
                <AuthForm />
            </Modal>
        </header>
    );
};

export default Header;