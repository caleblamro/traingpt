import { MouseEventHandler, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { useTheme } from "../../RootController";
import "./Card.css";
export default function Card(props: { onClick: MouseEventHandler<HTMLDivElement> | undefined; icon: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }){
    const theme = useTheme();
    return(
        <div onClick={props.onClick} style={{backgroundColor: theme.palette.background.special}} className="card">
            <div className="icon-container">
                {props.icon}
            </div>
            <h2 className="text medium" style={{color: theme.palette.text.special}}>{props.title}</h2>
            <h2 className="text small" style={{color: theme.palette.text.special}}>{props.description}</h2>
        </div>
    );
}
export const CenteredCard = (props: { onClick: MouseEventHandler<HTMLDivElement> | undefined; icon: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; title: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }) => {
    const theme = useTheme();
    return(
        <div onClick={props.onClick} style={{backgroundColor: theme.palette.background.paper}} className="card default">
            <div>
                {props.icon}
            </div>
            <h2 className="text medium" style={{color: theme.palette.text.primary}}>{props.title}</h2>
        </div>
    );
}