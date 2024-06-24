import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

import { createNewEvent, queryClient } from "../../util/http.js";

export default function NewEvent() {
    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewEvent,
        onSuccess: () => {
            navigate("/events");
            queryClient.invalidateQueries({ queryKey: ["fetchEvents"] });
        },
    });

    function handleSubmit(formData) {
        mutate({ event: formData });
    }

    return (
        <Modal onClose={() => navigate("../")}>
            <EventForm onSubmit={handleSubmit}>
                {isPending && <LoadingIndicator />}
                {!isPending && (
                    <>
                        <Link to="../" className="button-text">
                            Cancel
                        </Link>
                        <button type="submit" className="button">
                            Create
                        </button>
                    </>
                )}
            </EventForm>
            {isError && <p>{error.message}</p>}
        </Modal>
    );
}
