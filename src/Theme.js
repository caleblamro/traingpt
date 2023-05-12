export const tokens = mode => ({
    palette: {
        mode,
        ...(mode === "light")
        //light mode
        ? {
            background: {
                default: "#fbfcfe",
                paper: "#eef4f8",
                special: "#bfe9ff"
            },
            text: {
                primary: "#191c1e",
                special: "#001f2a",
            },
            primary: {
                main: "#006686",
                contrastText: "#eef4f8"
            },
            secondary: {
                main: "#4d616c",
                contrastText: "#ffffff"
            },
            tertiary: {
                main: "#bfe9ff",
                contrastText: "#001f2a"
            },
            alert: {
                success: "#47b275",
                warning: "#ffc109",
                error: "#ba1a1a",
                info: "#0087b1",
                special: "#a85baf",
                highlight: "#cece00"
            },
            file: {
                ppt: "#c43e1c",
            }
        }
        //dark mode
        : {
            background: {
                default: "#191c1e",
                paper: "#1e2629",
                special: "#004d65"
            },
            text: {
                primary: "#e1e2e5",
                special: "#bfe9ff",
            },
            primary: {
                main: "#70d2ff",
                contrastText: "#eef4f8"
            },
            secondary: {
                main: "#b5cad6",
                contrastText: "#1f333d"
            },
            tertiary: {
                main: "#6bd2ff",
                contrastText: "#003547"
            },
            alert: {
                success: "#3bd68f",
                warning: "#f5c004",
                error: "#cf3a2d",
                info: "#4fd3fd",
                special: "#f18bff",
                highlight: "#e4ed34"
            },
            file: {
                ppt: "#c43e1c",
                word: "#185abd",
            }
        }
    }
});