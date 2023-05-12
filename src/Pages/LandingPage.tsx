import { Link, redirect } from "react-router-dom";
import Button from "../Components/Button/Button";
import "./Pages.css";
import { useTheme } from "../RootController";

export default function LandingPage(){
    const theme = useTheme();
    return(
        <div style={{backgroundColor: theme.palette.background.default}} className="landing-page">
            <Link to="login"><Button onClick={() => { } } backgroundColor={theme.palette.background.special} color={theme.palette.text.primary} size="medium" text="Login / Sign Up" clickType={"button"} borderColor={""} type={""} loading={false} icon={undefined}/></Link>
        </div>
    );
}