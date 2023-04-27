import React from 'react';
import {
    createRoutesFromElements,
    createBrowserRouter,
} from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './root';
import ErrorPage from '../error-page';
import { loader as contactLoader } from './contact';
import Contact from '../components/Contact';
import EditContact, { action as editAction } from './edit';
import { action as destroyAction } from './destroy';
import { action as favoriteAction } from '../components/Favorite';
import { Index } from './';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Index /> },
                    {
                        path: 'contacts/:contactId',
                        element: <Contact />,
                        loader: contactLoader,
                    },
                    {
                        path: 'contacts/:contactId/edit',
                        element: <EditContact />,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: 'contacts/:contactId/destroy',
                        action: destroyAction,
                        errorElement: (
                            <div>
                                Ops! Houve um erro. Volte e tente novamente
                            </div>
                        ),
                    },
                    {
                        path: 'contacts/:contactId/favorite',
                        action: favoriteAction,
                    },
                ],
            },
        ],
    },
]);
