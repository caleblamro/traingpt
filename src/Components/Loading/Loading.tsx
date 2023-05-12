import { CSSProperties, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect } from "react";
import "./Loading.css";
import { useTheme } from "../../RootController";

export default function Loading(props: { loading: Boolean; backgroundColor: string | null | undefined; style: CSSProperties | undefined; static: Boolean; children: ReactElement; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
    const theme = useTheme();
    useEffect(() => {
        if(props.loading) {
        }else{
        }
    }, [props.loading])
    const colorStyle = { "--color" : theme.palette.background.special } as React.CSSProperties;
    return(
        <div style={{backgroundColor: props.backgroundColor ? props.backgroundColor : theme.palette.background.default, ...props.style}} id="loading-layout">
            {(!props.loading && !props.static) && props.children}
            {(props.loading || props.static) && 
                <div id="loading-container"><div style={colorStyle} className="loading-animation">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="text medium" style={{color: theme.palette.text.special, marginTop: 10, textAlign: 'center'}}>{props.text}</div>
                </div>
            }
        </div>
    );
}