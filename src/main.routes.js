import { createBrowserRouter } from 'react-router-dom';
import Root, {
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";

import ErrorPage from './error-page';

import Contact, {
    loader as contactLoader,
} from "./routes/contact";
import EditContact from "./routes/edit";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader
            },
        ],
    },

]);
