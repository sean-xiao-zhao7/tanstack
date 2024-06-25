import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { fetchEvent } from "../../util/http.js";

export default function EditEvent() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: eventData, isLoading } = useQuery({
        queryKey: ["fetchEvent", { id: id }],
        queryFn: ({ signal }) => fetchEvent({ signal, id }),
    });

    const { data: editResult, isPending } = useMutation({
        queryKey: ["editEvent", { id: id }],
        queryFn: () => {},
    });

    function handleSubmit(formData) {}

    function handleClose() {
        navigate("../");
    }

    return (
        <Modal onClose={handleClose}>
            {isLoading && <LoadingIndicator />}
            {!isLoading && (
                <EventForm inputData={eventData} onSubmit={handleSubmit}>
                    <Link to="../" className="button-text">
                        Cancel
                    </Link>
                    <button type="submit" className="button">
                        Update
                    </button>
                </EventForm>
            )}
        </Modal>
    );
}
