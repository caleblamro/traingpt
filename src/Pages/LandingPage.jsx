import { Link, redirect } from "react-router-dom";
import Button from "../Components/Button/Button";
import "./Pages.css";

export default function LandingPage(props){
    const theme = props.theme;
    return(
        <div style={{backgroundColor: theme.palette.background.default}} className="landing-page">
            <Link to="login"><Button backgroundColor={theme.palette.background.special} color={theme.palette.text.primary} size="medium" text="Login / Sign Up"/></Link>
        </div>
    );
}