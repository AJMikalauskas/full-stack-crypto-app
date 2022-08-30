import LoggedInAppBar from "../components/LoggedIn/LoggedInAppBar";
import { Outlet } from "react-router-dom";
const LoggedInHomeAppBarPage = () => {
    return (
        <div>
            <LoggedInAppBar/>
            <Outlet/>
        </div>
    );
}

export default LoggedInHomeAppBarPage;