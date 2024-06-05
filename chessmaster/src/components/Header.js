import { Link, TextInput } from "@gravity-ui/uikit";

import './Header.css';

const Header = (props) => {
    const { onSearch } = props;

    function onKeyDownHandler(event) {
        if (event.key === "Enter") {
            onSearch(event.target.value);
        }
    }

    return (
        <header>
            <div className="header">
                <h1>ChessMaster</h1>
                <TextInput 
                    className="search-panel"
                    placeholder="Search users..."
                    onKeyDown={onKeyDownHandler}
                />
            </div>
        </header>
    );
};

export default Header;