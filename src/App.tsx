import React, { useEffect, useState } from 'react';
import './App.css';
import Card, { CenteredCard } from './Components/Card/Card.jsx';
import { BugFilled, CameraFilled, AudioFilled, PlusOutlined } from "@ant-design/icons";
import TextMeter from './Components/TextMeter.jsx';
import Modal from './Components/Modal/Modal.jsx';
import CreateModelForm from './Forms/CreateModelForm';
import supabase from './Global/Supabase';
import { useSession, useTheme } from './RootController';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';

interface Model {
    id: number,
    user_id: number,
    title: string,
    icon_number: number,
    description: string,
}
function App(props: { setShowNav: (arg0: boolean) => void; setFullPageLoad: (arg0: boolean) => void }) {
    const [models, setModels] = useState<Model[]>([]);
    const [showCreateModel, setShowCreateModel] = useState<Boolean>(false);
    const theme = useTheme();
    const session = useSession();
    const navigate = useNavigate();
    const icons = [
        <BugFilled className="card-icon" style={{color: theme.palette.text.special}} />,
        <CameraFilled className="card-icon" style={{color: theme.palette.text.special}} />,
        <AudioFilled className="card-icon" style={{color: theme.palette.text.special}} />
    ]
    async function getModels(){
        const definitelyValidSession = session as Session;
        const user:User|null = definitelyValidSession.user ? definitelyValidSession.user : null;
        const id:string|null = user?.id ? user.id : null;
        if(id === null || user === null) {
            console.error("session.user or session.user.id is null... Going to Login");
            props.setShowNav(false);
            navigate("/login");
            return;
        }
        const { data, error } = await supabase.from('models').select<any, Model>('id, user_id, title, icon_number, description').eq('user_id', id);
        if(error) {
            console.error(`Error while fetching models with user_id: ${id}`);
            return;
        }
        setModels(data);
    }
    function toggleCreateModel(){
        setShowCreateModel(prev => !prev);
    }
    function goToLogin(){
        props.setShowNav(false);
        navigate("/login");
    }
    useEffect(() => {
        if(session) {
            getModels();
        }else{
            goToLogin();
        }
    }, [session])
    return (
        <React.Fragment>
            <Modal style={{backgroundColor: theme.palette.background.paper, width: "85%", maxWidth: 400}} show={showCreateModel} id="createModel" title="New Model">
                <CreateModelForm closeModal={toggleCreateModel} getModels={getModels} />
            </Modal>
            <main className="app" style={{backgroundColor: theme.palette.background.default}}>
                <section className="section">
                    <h1 className="text x-large" style={{color: theme.palette.text.primary}}>Models</h1>
                    <div className="models-container">
                        {models.map((value, i) => (
                            <Card key={i} icon={icons[value.icon_number]} title={value.title} description={value.description} onClick={() => {}} />
                        ))}
                        <CenteredCard onClick={toggleCreateModel} title="New Model" icon={<PlusOutlined className="icon-large" style={{color: theme.palette.text.primary}} />}/>
                    </div>
                </section>
                <section className="section">
                    <h1 className="text x-large" style={{ color: theme.palette.text.primary }}>Tokens</h1>
                    <div className="section">
                        <div className="stats-item">
                            <TextMeter number={523} min={100} mid={500} />
                            <p className="text large" style={{color: theme.palette.text.primary}}></p>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <h1 className="text x-large" style={{ color: theme.palette.text.primary }}>Stats</h1>
                    <div className="stats-container section" style={{backgroundColor: theme.palette.background.paper}}>
                        <div className="stats-item">
                            <h1 style={{color: theme.palette.alert.info}} className="text larger">
                                {models.length}
                            </h1>
                            <p className="text large" style={{color: theme.palette.text.primary}}>Models Trained</p>
                        </div>
                        <div className="stats-item">
                            <h1 style={{color: theme.palette.alert.special}} className="text larger">
                                1,245
                            </h1>
                            <p className="text large" style={{color: theme.palette.text.primary}}>Prompts Given</p>
                        </div>
                        <div className="stats-item">
                            <h1 style={{color: theme.palette.alert.highlight}} className="text larger">
                                24.3gb
                            </h1>
                            <p className="text large" style={{color: theme.palette.text.primary}}>Of Training Data</p>
                        </div>
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}

export default App;
