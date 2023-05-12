import './Loading.jsx'
export default function Process(props) {
    
    return(
        <div className="process">
            {props.steps.map((s, i) => (
                <div className="process-step">
                    <span style={{width: 30, height: 30, borderRadius: "50%", backgroundColor: props.theme.palette.background.special, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i+1}</span>
                    <span className="text medium" style={{color: props.theme.palette.text.special}}>{s}</span>
                </div>
            ))}
        </div>
    );
}