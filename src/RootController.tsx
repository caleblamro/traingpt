import React, { useState } from "react";
import { Theme, ThemeMode, tokens } from "./Theme";
import Nav from "./Components/Nav/Nav";
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate
} from "react-router-dom";
import App from "./App";
import Authentication from "./Components/Authentication";
import LandingPage from "./Pages/LandingPage";
import Loading from "./Components/Loading/Loading";
import { Session } from "@supabase/supabase-js";

export const ThemeContext = React.createContext<Theme>(tokens(ThemeMode.LIGHT));
export const SessionContext = React.createContext<Session | null | {}>(null);

export const useSession = () => {
    return React.useContext<Session | null | {}>(SessionContext);
}

export const useTheme = () => {
    return React.useContext<Theme>(ThemeContext);
}

export default function RootController() {
    const [fullPageLoad, setFullPageLoad] = useState(false);
    const [session, setSession] = useState<Session | null | {}>({});
    const [showNav, setShowNav] = useState(false);
    const [mode, setMode] = useState<ThemeMode>(ThemeMode.LIGHT);
    const [theme, setTheme] = useState<Theme>(tokens(mode));

    const toggleTheme = () => {
        if(mode === ThemeMode.DARK) {
            setMode(ThemeMode.LIGHT);
            setTheme(tokens(ThemeMode.LIGHT));
        }else{
            setMode(ThemeMode.DARK);
            setTheme(tokens(ThemeMode.DARK));
        }
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />
        },
        {
            path: "/app",
            element: <App setFullPageLoad={setFullPageLoad} setShowNav={setShowNav}  />
        },
        {
            path: "/login",
            element: <Authentication setFullPageLoad={setFullPageLoad} setShowNav={setShowNav} setSession={setSession} />
        }
    ])
    return(
        <SessionContext.Provider value={session}>
            <ThemeContext.Provider value={theme}>
                {showNav && <Nav toggleMode={toggleTheme} />}
                <Loading loading={fullPageLoad} backgroundColor={"inherit"} style={undefined} static={false} text={""}>
                    <RouterProvider router={router} />
                </Loading>
            </ThemeContext.Provider>
        </SessionContext.Provider>
    )
}