import EventsIntroSection from "../Events/EventsIntroSection.jsx";
import FindEventSection from "../Events/FindEventSection.jsx";
import NewEventsSection from "../Events/NewEventsSection.jsx";

export default function HomePage() {
    return (
        <>
            <main>
                <EventsIntroSection />
                <NewEventsSection />
                <FindEventSection />
            </main>
        </>
    );
}
