import React from 'react';
import ReactDOM from 'react-dom/client';
// import {
//     createBrowserRouter,
//     RouterProvider,
// } from "react-router-dom";
import RootController from './RootController';
import "./App.css";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <RootController />
//     },
//     {
//         path: "/app",
//         element: <App />
//     },
//     {
//         path: "/login",
//         element: <Authentication />
//     }
// ])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootController />
  </React.StrictMode>,
)