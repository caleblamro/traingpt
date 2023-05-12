import { Box } from "@mui/material";
import "./Nav.css";
import { UserOutlined, SettingOutlined, PlusOutlined, BulbOutlined } from "@ant-design/icons";
import supabase from "../../Global/Supabase";
import { useTheme } from "../../RootController";

export default function Nav(props: { toggleMode: () => void; }) {
    const theme = useTheme();
    const testInvoke = async () => {
        const { data, error } = await supabase.functions.invoke('create_model', {
            body: JSON.stringify({ model_id: "c2ef6f04-25ba-4f56-8737-6bc4c74079e0" }),
        })
        console.log("data", data);
        console.log("error", error);
    }
    return(
        <nav className="nav">
            <img className="logo" src="logo.svg"></img>
            {/* <div></div> */}
            <Box className="flex">
                <PlusOutlined onClick={testInvoke} className="icon" style={{color: theme.palette.text.primary}} />
                <BulbOutlined onClick={() => props.toggleMode()} className="icon" style={{color: theme.palette.text.primary}} />
                <UserOutlined className="icon" style={{color: theme.palette.text.primary}} />
                <SettingOutlined className="icon" style={{color: theme.palette.text.primary}} />
            </Box>
        </nav>
    );
}