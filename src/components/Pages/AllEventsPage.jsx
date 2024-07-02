import { useQuery } from "@tanstack/react-query";

import { fetchEvents } from "../../util/http";

import EventItem from "../Events/EventItem";
import LoadingIndicator from "../UI/LoadingIndicator";

const AllEventsPage = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["fetchEvents"],
        queryFn: ({ signal }) => fetchEvents({ signal }),
    });

    return (
        <section className="content-section">
            <h1>All events</h1>
            {isLoading && <LoadingIndicator />}
            {!isLoading && (
                <ul className="events-list">
                    {data.map((event) => (
                        <li key={event.id}>
                            <EventItem event={event} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default AllEventsPage;
