import { CloseOutlined } from "@ant-design/icons";
import "./Modal.css";
import { CSSProperties, ElementType, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useTheme } from "../../RootController";

export default function Modal(props: { id: string | undefined; show: Boolean; style: CSSProperties | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }){
    const [count, setCount] = useState(0);
    const theme = useTheme();

    const toggleModal = () => {
        const modal = document.querySelector(`#${props.id}`) as HTMLDialogElement;
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