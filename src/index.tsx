import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Characters from "./pages/Characters/Characters";
import Episode from "./pages/Episode/Episode";
import Location from "./pages/Location/Location";
import Character from "./pages/Character/Character";

const container = document.getElementById('root')!;
const root = createRoot(container);


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Characters/>,
            },
            {
                path: "/episodes",
                element: <Episode/>,
            },
            {
                path: "/location",
                element: <Location/>,
            },
            {
                path: "/character/:id",
                element: <Character/>,
            },
        ]
    },
]);

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
