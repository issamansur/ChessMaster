import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text, Avatar, TextInput, User, Modal, Icon, DropdownMenu } from "@gravity-ui/uikit";

import { useUser } from "../contexts/UserContext";

import { 
    Magnifier as SearchIcon,
    ArrowRightFromSquare as LogoutIcon,
    Person as UserIcon,
    Gear as SettingsIcon,
} from "@gravity-ui/icons";

import './Header.css';
import AuthForm from "./AuthForm";
import UserBadge from "./UserBadge";

const Header = (props) => {
    const navigate = useNavigate();
    const { onSearch } = props;
    const [user, setUserAndStore] = useUser();
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

    function onLogoutClick() {
        setUserAndStore(null);
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
                                <Icon data={SearchIcon} size={10} />
                            </Button>
                        }
                        style={{ marginRight: "10px" }}
                        placeholder="Search users..."
                        onKeyDown={onKeyDownHandler}
                    />
                    */}
                    { user.token ? (
                        <DropdownMenu
                            size="l"
                            renderSwitcher={(props) => (
                                <div {...props} style={{cursor: 'pointer'}}>   
                                    <UserBadge
                                        username={user.username}
                                        position="right"
                                    />
                                </div>
                            )}
                            items={[
                                [
                                    {
                                        iconStart: <Icon data={UserIcon} size={16} />,
                                        text: 'Go to profile',
                                        action: () => navigate(`/users/${user.username}`),
                                    },
                                    {
                                        iconStart: <Icon data={SettingsIcon} size={16} />,
                                        text: 'Settings',
                                        action: () => navigate('/settings'),
                                    }
                                ],
                                [
                                    {
                                        iconStart: <Icon data={LogoutIcon} size={16} />,
                                        text: 'Logout',
                                        action: () => onLogoutClick(),
                                        theme: 'danger'
                                    },
                                ],
                            ]}
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
                <AuthForm onLogin={() => setIsAuthFormOpen(false)} />
            </Modal>
        </header>
    );
};

export default Header;