import { CloseOutlined } from "@ant-design/icons";
import "./Modal.css";
import { useEffect, useState } from "react";

export default function Modal(props){
    const [count, setCount] = useState(0);
    const theme = props.theme;
    const supabase = props.supabase;
    const session = props.session;

    const toggleModal = () => {
        const modal = document.querySelector(`#${props.id}`);
        if (!modal.hasAttribute('open')) {
            modal.showModal();
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        }else{
            modal.classList.remove("show");
            setTimeout(() => {
                modal.close();
            }, 500);
        }
    }
    useEffect(() => {
        setCount(prev => prev + 1);
        if(count >= 2) {
            toggleModal();
        }
    }, [props.show]);

    return(
        <dialog id={props.id} className="modal" style={{...props.style, borderRadius: 5, boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.5)', padding: "15px 15px"}}>
            <div style={{display: 'flex',width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <h1 className="text large" style={{color: theme.palette.text.primary}}>{props.title}</h1>
                <div onClick={toggleModal} style={{backgroundColor: theme.palette.background.paper, position: "relative", top: "unset", left: "unset"}} className="go-back"><CloseOutlined className="card-icon" style={{color: theme.palette.text.primary}}/></div>
            </div>
            {props.children}
        </dialog>
    )
}