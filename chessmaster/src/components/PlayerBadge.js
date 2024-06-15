import { useNavigate } from "react-router-dom";
import { Avatar, UserLabel } from "@gravity-ui/uikit";

const PlayerBadge = (props) => {
    let navigate = useNavigate();

    const { username, position } = props;

    const positionToFlex = position === "right" ? "flex-end" : "flex-start";

    function onClickHandler() {
        navigate(`/users/${username}`);
    }

    return (
        <div style={{display: "flex", justifyContent: positionToFlex }}>
            <UserLabel
                style={{height: 42 }}
                view="outlined"
                type="person"
                avatar={<Avatar text={username} size="l" />}
                onClick={onClickHandler}
            >
                {username}
            </UserLabel>
        </div>
    );
};

export default PlayerBadge;