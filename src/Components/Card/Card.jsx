import "./Card.css";
export default function Card(props){
    return(
        <div onClick={props.onClick} style={{backgroundColor: props.theme.palette.background.special}} className="card">
            <div className="icon-container">
                {props.icon}
            </div>
            <h2 className="text medium" style={{color: props.theme.palette.text.special}}>{props.title}</h2>
            <h2 className="text small" style={{color: props.theme.palette.text.special}}>{props.description}</h2>
        </div>
    );
}
export const CenteredCard = (props) => {
    return(
        <div onClick={props.onClick} style={{backgroundColor: props.theme.palette.background.paper}} className="card default">
            <div>
                {props.icon}
            </div>
            <h2 className="text medium" style={{color: props.theme.palette.text.primary}}>{props.title}</h2>
        </div>
    );
}