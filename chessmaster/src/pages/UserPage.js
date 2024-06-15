import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { username } = useParams();

    return (
        <div>
            <h1>User Page of {username}</h1>
        </div>
    );
};

export default UserPage;