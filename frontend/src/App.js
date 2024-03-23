import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Error from "./pages/Error";
import EventsRoot from "./pages/EventsRoot";
import Events, { loader as eventsLoader } from "./pages/Events";
import EventDetail, { loader as detailLoader } from "./pages/EventDetail";
import EditEvent from "./pages/EditEvent";
import NewEvent, { action as newEventAction } from "./pages/NewEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            loader: detailLoader,
            id: 'event-detail',
            children: [
              {
                index: true,
                element: <EventDetail />,
              },
              {
                path: "edit",
                element: <EditEvent />,
              },
            ]
          },
          {
            path: "new",
            element: <NewEvent />,
            action: newEventAction,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
