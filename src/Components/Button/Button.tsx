import { LoadingOutlined } from "@ant-design/icons";
import "./Button.css";
import { MouseEventHandler, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { useTheme } from "../../RootController";
export default function Button(props: { clickType: "button" | "reset" | "submit" | undefined; onClick: MouseEventHandler<HTMLButtonElement> | undefined; backgroundColor: string|"inherit"; borderColor: string|"inherit"; color: string; type: string; loading: Boolean; icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined; size: string; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
    const theme = useTheme();
    const colorStyle = { "--button-color": props.backgroundColor, "--border-color": props.borderColor } as React.CSSProperties;
    return(
        <button type={props.clickType ? props.clickType : "button"} onClick={props.onClick} style={{...colorStyle, color: props.color}} className={"button " + props.type}>
            {!props.loading && <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 20}}>{props.icon && props.icon}
            <span className={"text " + props.size}>{props.text}</span>
            </div>}
            {props.loading && <LoadingOutlined spin className="card-icon" style={{color: theme.palette.text.primary}} />}
        </button>
    );
}