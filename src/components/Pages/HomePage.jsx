import EventsIntroSection from "../Events/EventsIntroSection.jsx";
import NewEventsSection from "../Events/NewEventsSection.jsx";

export default function HomePage() {
    return (
        <>
            <main>
                <EventsIntroSection />
                <NewEventsSection />
            </main>
        </>
    );
}
