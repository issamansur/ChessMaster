import { Avatar, UserLabel } from "@gravity-ui/uikit";

const UserBadge = (props) => {
    const { username, position, avatar, isActive, onClick } = props;

    const positionToFlex = position === "right" ? "flex-end" : "flex-start";

    function clickHandler() {
        if (onClick) {
            onClick(username);
        }
    }

    return (
        <div style={{display: "flex", justifyContent: positionToFlex }}>
            <UserLabel
                style={{ height: 32, backgroundColor: isActive ? "yellow" : "transparent" }}
                view="outlined"
                type={ avatar ? "person" : "empty" }
                avatar={ <Avatar text={username} size="m" /> }
                onClick={ clickHandler }
            >
                {username}
            </UserLabel>
        </div>
    );
};

export default UserBadge;