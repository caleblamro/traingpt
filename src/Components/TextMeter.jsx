import { useState, useEffect } from "react";

export default function TextMeter(props) {
    const [color, setColor] = useState(props.theme.palette.text.primary);
    useEffect(() => {
        if(props.number < props.min) {
            setColor(props.theme.palette.alert.error);
        }else if(props.number < props.mid) {
            setColor(props.theme.palette.alert.warning);
        }else{
            setColor(props.theme.palette.alert.success);
        }
    }, [props.number, props.theme]);
    return(
        <h1 style={{color: color}} className="text larger">
            {props.number}
        </h1>
    );
}