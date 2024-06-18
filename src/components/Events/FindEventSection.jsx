import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { fetchEvents } from "../../util/http";

export default function FindEventSection() {
    const searchElement = useRef();

    const { data } = useQuery({
        queryFn: fetchEvents,
    });

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <section className="content-section" id="all-events-section">
            <header>
                <h2>Find your next event!</h2>
                <form onSubmit={handleSubmit} id="search-form">
                    <input
                        type="search"
                        placeholder="Search events"
                        ref={searchElement}
                    />
                    <button>Search</button>
                </form>
            </header>
            <p>Please enter a search term and to find events.</p>
        </section>
    );
}
