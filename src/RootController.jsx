import { useState, useEffect, useRef } from "react";
import { tokens } from "./Theme";
import Nav from "./Components/Nav/Nav";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import App from "./App";
import Authentication from "./Components/Authentication";
import LandingPage from "./Pages/LandingPage";
import Loading from "./Components/Loading/Loading";
import supabase from "./Global/Supabase";

export default function RootController() {
    const [fullPageLoad, setFullPageLoad] = useState(true);
    const [mode, setMode] = useState('dark');
    const [theme, setTheme] = useState(tokens(mode));
    const [session, setSession] = useState({});
    const [showNav, setShowNav] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage theme={theme} />
        },
        {
            path: "/app",
            element: <App setFullPageLoad={setFullPageLoad} setShowNav={setShowNav} setSession={setSession} session={session} theme={theme} />
        },
        {
            path: "/login",
            element: <Authentication setFullPageLoad={setFullPageLoad} setShowNav={setShowNav} setSession={setSession} theme={theme} />
        }
    ])
    useEffect(() => {
        setFullPageLoad(false);
    }, []);
    const toggleMode = () => {
        setMode((prev) => prev === 'light' ? 'dark' : 'light');
        setTheme(tokens(mode));
    }
    return(
        <Loading loading={fullPageLoad} theme={theme}>
           {showNav && <Nav theme={theme} toggleMode={toggleMode} />}
            <RouterProvider router={router} />
        </Loading>
    )
}