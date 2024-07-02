import { Link, Outlet } from "react-router-dom";

import Header from "../Layout/Header.jsx";
import EventsIntroSection from "./EventsIntroSection.jsx";
import FindEventSection from "./FindEventSection.jsx";
import NewEventsSection from "./NewEventsSection.jsx";

export default function Events() {
    return (
        <>
            <Outlet />
            <Header>
                <Link to="/" className="button">
                    Home
                </Link>
                <Link to="/allevents" className="button">
                    All Events
                </Link>
                <Link to="/events/new" className="button">
                    Add New Event
                </Link>
            </Header>
            <main>
                <EventsIntroSection />
                <NewEventsSection />
                <FindEventSection />
            </main>
        </>
    );
}
