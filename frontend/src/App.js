import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Error from "./pages/Error";
import EventsRoot from "./pages/EventsRoot";
import Events, { loader as eventsLoader } from "./pages/Events";
import EventDetail, {
  loader as detailLoader,
  action as eventDeleteAction,
} from "./pages/EventDetail";
import EditEvent from "./pages/EditEvent";
import NewEvent from "./pages/NewEvent";
import { action as manipulateEventAction } from "./components/EventForm";

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
            path: ":eventId",
            loader: detailLoader,
            id: "event-detail",
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: eventDeleteAction,
              },
              {
                path: "edit",
                element: <EditEvent />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEvent />,
            action: manipulateEventAction,
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
