import { LoadingOutlined } from "@ant-design/icons";
import "./Button.css";
export default function Button(props) {
    return(
        <button type={props.clickType ? props.clickType : "button"} onClick={props.onClick} style={{"--button-color": props.backgroundColor, "--border-color": props.borderColor, color: props.color}} className={"button " + props.type}>
            {!props.loading && <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 20}}>{props.icon && props.icon}
            <span className={"text " + props.size}>{props.text}</span>
            </div>}
            {props.loading && <LoadingOutlined spin className="card-icon" style={{color: props.theme.palette.text.secondary}} />}
        </button>
    );
}