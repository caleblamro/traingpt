import { CSSProperties } from "@mui/material/styles/createMixins";

export default function Text(props: { size: string; style: CSSProperties | undefined }) {
    return(
        <p style={{...props.style}} className={"text " + props.size} >

        </p>
    );
}