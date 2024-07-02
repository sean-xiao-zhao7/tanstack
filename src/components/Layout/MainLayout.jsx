import { Link, Outlet } from "react-router-dom";

import Header from "./Header.jsx";

export default function MainLayout() {
    return (
        <>
            <Header>
                <Link to="/" className="button">
                    Home
                </Link>
                <Link to="/events/all" className="button">
                    All Events
                </Link>
                <Link to="/events/new" className="button">
                    Add New Event
                </Link>
            </Header>
            <Outlet />
        </>
    );
}
