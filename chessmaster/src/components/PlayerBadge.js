import { UserLabel } from "@gravity-ui/uikit";

const PlayerBadge = (props) => {
    const { username, position, onClick } = props;

    const positionToFlex = position === "right" ? "flex-end" : "flex-start";

    return (
        <div style={{display: "flex", justifyContent: positionToFlex}}>
            <UserLabel
                view="outlined" 
                type="person"
                avatar={undefined}
                onClick={onClick}
            >
                {username}
            </UserLabel>
        </div>
    );
};

export default PlayerBadge;