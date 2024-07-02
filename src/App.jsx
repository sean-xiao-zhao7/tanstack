import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent from "./components/Events/EditEvent.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js";
import AllEventsPage from "./components/Pages/AllEventsPage.jsx";
import MainLayout from "./components/Layout/MainLayout.jsx";
import HomePage from "./components/Pages/HomePage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/events/new",
                element: <NewEvent />,
            },
            {
                path: "/events/all",
                element: <AllEventsPage />,
            },
        ],
    },
    {
        path: "/events/:id",
        element: <EventDetails />,
        children: [
            {
                path: "/events/:id/edit",
                element: <EditEvent />,
            },
        ],
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
