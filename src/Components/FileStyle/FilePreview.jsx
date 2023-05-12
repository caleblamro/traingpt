import { DeleteTwoTone, FileExcelTwoTone, FileImageTwoTone, FileMarkdownTwoTone, FilePdfTwoTone, FilePptTwoTone, FileTextTwoTone, FileUnknownTwoTone, FileWordTwoTone, Html5TwoTone } from "@ant-design/icons";
import "./FileStyle.css";
import { useEffect } from "react";
export default function FilePreview(props){
    const theme = props.theme;
    const index = props.fileName.indexOf('.');
    const extension = props.fileName.substring(index + 1);
    const icons = {
        "txt": <FileTextTwoTone />,
        "pdf": <FilePdfTwoTone />,
        "doc": <FileWordTwoTone twoToneColor={theme.palette.file.word} />,
        "docx": <FileWordTwoTone twoToneColor={theme.palette.file.word} />,
        "ppt": <FilePptTwoTone twoToneColor={theme.palette.file.ppt} />,
        "pptx": <FilePptTwoTone twoToneColor={theme.palette.file.ppt} />,
        "jpg": <FileImageTwoTone />,
        "jpeg": <FileImageTwoTone />,
        "xlsx": <FileExcelTwoTone />,
        "md": <FileMarkdownTwoTone />,
        "html": <Html5TwoTone />,
        default: <FileUnknownTwoTone />
    }
    useEffect(() => {
        //give time for components to render
        setTimeout(() => {
            const file = document.getElementById(`file-preview${props.index}`);
            file.classList.add("open");
            setTimeout(() => {
                file.classList.add("show");
            }, 20);
        }, 20);
    }, [])
    return(
        <div id={`file-preview${props.index}`} style={{backgroundColor: props.backgroundColor, color: props.color}} className="file-preview">
            <div className="file-preview-icon">{icons[extension] || icons.default}</div>
            <div className="text small file-name">{props.fileName.trim()}</div>
            <div onClick={() => props.removeFile(props.index)} className="file-preview-icon"><DeleteTwoTone twoToneColor={theme.palette.alert.error} /></div>
        </div>
    );
}