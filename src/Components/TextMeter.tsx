import { useState, useEffect } from "react";
import { Theme } from "../Theme";
import { useTheme } from "../RootController";

export default function TextMeter(props: { number: number; min: number; mid: number; }) {
    const theme = useTheme();
    const [color, setColor] = useState(theme.palette.text.primary);
    
    useEffect(() => {
        if(props.number < props.min) {
            setColor(theme.palette.alert.error);
        }else if(props.number < props.mid) {
            setColor(theme.palette.alert.warning);
        }else{
            setColor(theme.palette.alert.success);
        }
    }, [props.number]);
    return(
        <h1 style={{color: color}} className="text larger">
            {props.number}
        </h1>
    );
}