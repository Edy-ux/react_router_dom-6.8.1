import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root, {
    loader as rootLoader,
    action as rootAction,
} from './routes/root';
import ErrorPage from './error-page';
import { loader as contactLoader } from './routes/contact';
import Contact from './components/Contact';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import { action as favoriteAction } from './components/Favorite';
import { Index } from './routes';

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

/*
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >  
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
        <Route
          path="contacts/:contactId/favorite"
          action={favoriteAction}
        />

      </Route>
    </Route>
  )
);

 */
