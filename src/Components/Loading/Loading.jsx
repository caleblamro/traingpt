import { useEffect } from "react";
import "./Loading.css";

export default function Loading(props) {
    useEffect(() => {
        if(props.loading) {
        }else{
        }
    }, [props.loading])
    return(
        <div style={{backgroundColor: props.backgroundColor ? props.backgroundColor : props.theme.palette.background.default, ...props.style}} id="loading-layout">
            {(!props.loading && !props.static) && props.children}
            {(props.loading || props.static) && 
                <div id="loading-container"><div style={{"--color": props.theme.palette.background.special}} className="loading-animation">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="text medium" style={{color: props.theme.palette.text.special, marginTop: 10, textAlign: 'center'}}>{props.text}</div>
                </div>
            }
        </div>
    );
}