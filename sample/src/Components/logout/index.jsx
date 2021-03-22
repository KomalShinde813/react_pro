import { AppStorage } from "../../Core/Service/storage-service";

const logout = props => {
    AppStorage.performLogout();
    props.history.push("/");
    window.location.reload();
    return <div />;
}

export default logout;