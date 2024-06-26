import { Link, Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Header from "../Header.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { deleteEvent, fetchEvent } from "../../util/http.js";

export default function EventDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["fetchSingleEvent", { id }],
        queryFn: ({ signal }) => fetchEvent({ signal, id }),
        enabled: id !== undefined,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: ({ signal }) => deleteEvent({ signal, id }),
        onSuccess: () => {
            navigate("/events");
            queryClient.invalidateQueries({ queryKey: ["fetchEvents"] });
        },
        enabled: id !== undefined,
    });

    return (
        <>
            <Outlet />
            <Header>
                <Link to="/events" className="nav-item">
                    View all Events
                </Link>
            </Header>
            <article id="event-details">
                {isLoading && (
                    <header>
                        <LoadingIndicator />
                    </header>
                )}
                {!isLoading && (
                    <>
                        <header>
                            <h1>{data.title}</h1>
                            <nav>
                                {isPending && <LoadingIndicator />}
                                {!isPending && (
                                    <button onClick={mutate}>Delete</button>
                                )}
                                <Link to="edit">Edit</Link>
                            </nav>
                        </header>
                        <div id="event-details-content">
                            <img
                                src={"http://localhost:3000/" + data.image}
                                alt=""
                            />
                            <div id="event-details-info">
                                <div>
                                    <p id="event-details-location">
                                        {data.location}
                                    </p>
                                    <time dateTime={`Todo-DateT$Todo-Time`}>
                                        {data.date} @ {data.time}
                                    </time>
                                </div>
                                <p id="event-details-description">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </article>
        </>
    );
}
