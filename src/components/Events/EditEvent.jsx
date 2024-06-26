import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";

export default function EditEvent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryKey = ["fetchSingleEvent", { id }];

    const { data: eventData, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: ({ signal }) => fetchEvent({ signal, id }),
    });

    const { mutate, isPending: isEditPending } = useMutation({
        mutationFn: ({ signal, event }) => {
            updateEvent({ signal, id, event });
        },
        onMutate: async ({ event }) => {
            await queryClient.cancelQueries(queryKey);
            const currentQueryData = queryClient.getQueryData([
                "fetchSingleEvent",
                { id },
            ]);
            queryClient.setQueryData(queryKey, event);
            return { currentQueryData };
        },
        onError: (context) => {
            queryClient.setQueryData(queryKey, context.currentQueryData);
        },
    });

    function handleSubmit(formData) {
        mutate({ event: formData });
        navigate("../");
    }

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
                    <button
                        type="submit"
                        className="button"
                        disabled={isEditPending}
                    >
                        Update
                    </button>
                    {isEditPending && <LoadingIndicator />}
                </EventForm>
            )}
        </Modal>
    );
}
