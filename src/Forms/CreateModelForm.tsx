import React, { useState, useEffect } from 'react';
import "./Form.css";
import { AudioFilled, BugFilled, CameraFilled, SendOutlined, UploadOutlined } from '@ant-design/icons';
import Button from '../Components/Button/Button';
import FilePreview from '../Components/FileStyle/FilePreview';
import supabase from '../Global/Supabase';
import { useSession, useTheme } from '../RootController';
import { Session } from '@supabase/supabase-js';
const CreateModelForm = (props: { getModels: () => void; closeModal: () => void }) => {
    // Define state variables for form inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState(0);
    const [model, setModel] = useState(''); // Initially empty, as it is a disabled dropdown
    const [step, setStep] = useState("");
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const theme = useTheme();
    const session:Session|null|{} = useSession();


    // Define function to handle form submission
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Perform some action with form data, e.g. submit to a backend API
        setLoading(true);
        setStep("Initializing Model");
        console.log({ title, description, files });
        if(!session) {
            console.log("error cannot submit, no user logged in");
            return;
        }
        const definitelyValidSession = session as Session;
        const id = definitelyValidSession.user.id;
        console.log("ID: " + id);
        const {data: res, error} = await supabase.from('models').insert({
            user_id: id,
            title: title,
            icon_number: 0,
            description: description
        }).select('*');
        if(error) {
            console.log("couldn't create model");
            return;
        }
        setStep("Uploading Files to the Cloud");
        const model_id:string = res[0]?.id;
        files.forEach(async (file, index) => {
            console.log(`Uploading to ${model_id}/${file.name}`);
            const { data, error } = await supabase
            .storage
            .from('models')
            .upload(`${model_id}/${file.name}`, file, {
                cacheControl: '3600',
                upsert: false
            });
            if(error) throw error;
        })
        setStep("Creating embeddings for GPT");
        const { data, error: er } = await supabase.functions.invoke('create_model', {
            body: JSON.stringify({ model_id: model_id }),
        })
        setLoading(false);
        props.getModels();
        setStep('');
        // Reset form inputs after submission
        setTitle('');
        setDescription('');
        setFiles([]);
    };

    const uploadFiles = () => {
        if(fileInputRef) {
            const definitelyValidHTMLInput:HTMLInputElement = fileInputRef.current as HTMLInputElement;
            definitelyValidHTMLInput.click();
        }
    };
    const removeFile = (index:number) => {
        setFiles(prev => prev.filter((element, i) => { return i !== index}));
    }

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const list:FileList = event.target.files ? event.target.files : new FileList();
        const newFiles = Array.from(list);
        const existingFiles = files.map((file:File) => file.name);
        const uniqueNewFiles = newFiles.filter(file => !existingFiles.includes(file.name));
        setFiles((prevFiles:File[]) => [...prevFiles, ...uniqueNewFiles]);
    };

    // Define options for icon dropdown
    const iconOptions = [
        { label: <BugFilled className="card-icon" style={{color: theme.palette.text.special}} />, value: 0 },
        { label: <CameraFilled className="card-icon" style={{color: theme.palette.text.special}} />, value: 1 },
        { label: <AudioFilled className="card-icon" style={{color: theme.palette.text.special}} />, value: 2 },
    ];

    // Define options for model dropdown (disabled)
    // const modelOptions = [
    //     { label: 'Model 1', value: 'model1' },
    //     { label: 'Model 2', value: 'model2' },
    //     { label: 'Model 3', value: 'model3' },
    // ];

    return (
        <form style={{display: 'flex', flexDirection: 'column', gap: 40, padding: "10px 0"}} onSubmit={handleSubmit}>
            <div className="flex2 column">
                <label style={{color: theme.palette.text.primary}} className="text medium" htmlFor="title">Title</label>
                <input
                    className="text-input"
                    // style={{borderBottom: '2px solid ' + theme.palette.background.special + ' !important'}}
                    type="text"
                    style={{color: theme.palette.text.primary, resize: 'none'}}
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="flex2 column">
                <label style={{color: theme.palette.text.primary}} className="text medium" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="text-input"
                    style={{color: theme.palette.text.primary, resize: 'none'}}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            {/* <div className="flex2 column">
                <label style={{color: theme.palette.text.primary}} className="text medium" htmlFor="icon">Icon</label>
                <select
                    style={{color: theme.palette.text.primary, padding: 5}}
                    id="icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                >
                    <option style={{backgroundColor: theme.palette.background.default}} value="">Select an icon</option>
                    {iconOptions.map((option) => (
                        <option style={{backgroundColor: theme.palette.background.default, width: "100%", height: "fit-content"}} key={option.value} value={option.value}>
                            <span><BugFilled className="card-icon" style={{color: theme.palette.text.special}} /></span>
                        </option>
                    ))}
                </select>
            </div> */}
            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt,.pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.eml,.msg,.html,.md"
                style={{ display: 'none' }}
            />
            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: 10, transitionDuration: '0.5s'}}>
                {files?.map((value, index) => (
                    <FilePreview removeFile={removeFile} index={index} key={`filePreview${index}`} fileName={value.name} backgroundColor={theme.palette.background.paper} color={theme.palette.text.special} />
                ))}
                <Button loading={false} onClick={uploadFiles} backgroundColor={theme.palette.alert.info} color={theme.palette.text.secondary} type="left" icon={<UploadOutlined className="card-icon" style={{ color: theme.palette.text.secondary }} />} text="Upload Data" clickType={undefined} borderColor={''} size={''}/>
                <Button loading={loading} backgroundColor={theme.palette.alert.success} type="left" color={theme.palette.text.secondary} icon={<SendOutlined className="card-icon" style={{ color: theme.palette.text.secondary }} />} text="Create Model" clickType="submit" onClick={undefined} borderColor={''} size={''} />
            </div>
        </form>
    );
};

export default CreateModelForm;