import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";

import { createNewEvent } from "../../util/http.js";

export default function NewEvent() {
    const navigate = useNavigate();

    const { data, mutate, isError, error } = useMutation({
        mutationFn: createNewEvent,
    });

    function handleSubmit(formData) {}

    return (
        <Modal onClose={() => navigate("../")}>
            <EventForm onSubmit={handleSubmit}>
                <>
                    <Link to="../" className="button-text">
                        Cancel
                    </Link>
                    <button type="submit" className="button">
                        Create
                    </button>
                </>
            </EventForm>
        </Modal>
    );
}
