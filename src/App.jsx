import React, { useEffect, useState } from 'react';
import './App.css';
import Card, { CenteredCard } from './Components/Card/Card.jsx';
import { BugFilled, CameraFilled, AudioFilled, PlusOutlined } from "@ant-design/icons";
import TextMeter from './Components/TextMeter.jsx';
import Modal from './Components/Modal/Modal.jsx';
import CreateModelForm from './Forms/CreateModelForm';
import supabase from './Global/Supabase';



function App(props) {
    const [models, setModels] = useState([]);
    const [showCreateModel, setShowCreateModel] = useState(false);
    const theme = props.theme;
    const session = props.session;
    const icons = [
        <BugFilled className="card-icon" style={{color: theme.palette.text.special}} />,
        <CameraFilled className="card-icon" style={{color: theme.palette.text.special}} />,
        <AudioFilled className="card-icon" style={{color: theme.palette.text.special}} />
    ]
    async function getModels(){
        const id = props.session.user.id;
        const { data, error } = await supabase.from('models').select('id, user_id, title, icon_number, description').eq('user_id', id);
        if(error) {
            console.log("ERROR IN FETCHING MODELS WITH USER ID: " + id);
            return;
        }
        setModels(data);
    }
    function toggleCreateModel(){
        setShowCreateModel(prev => !prev);
    }
    useEffect(() => {
        props.setFullPageLoad(true);
        supabase.auth.getSession().then(({ data }) => {
            if(!data) {
                navigate("/login");
            }
            props.setShowNav(true);
            props.setSession(data.user);
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            props.setSession(session);
        })
        props.setFullPageLoad(false);
        return () => subscription.unsubscribe();
    }, []);
    useEffect(() => {
        if(props?.session?.user?.id) {
            getModels();
        }
    }, [props.session])
    return (
        <>
            <Modal style={{backgroundColor: theme.palette.background.paper, width: "85%", maxWidth: 400}} show={showCreateModel} theme={theme} id="createModel" title="New Model">
                <CreateModelForm closeModal={toggleCreateModel} getModels={getModels} theme={theme} session={session}/>
            </Modal>
            <main className="app" style={{backgroundColor: theme.palette.background.default}}>
                <section className="section">
                    <h1 className="text x-large" style={{color: theme.palette.text.primary}}>Models</h1>
                    <div className="models-container">
                        {models.map((value, i) => (
                            <Card theme={theme} key={i} icon={icons[value.icon_number]} title={value.title} description={value.description} />
                        ))}
                        <CenteredCard onClick={toggleCreateModel} theme={theme} title="New Model" icon={<PlusOutlined className="icon-large" style={{color: theme.palette.text.primary}} />}/>
                    </div>
                </section>
                <section className="section">
                    <h1 className="text x-large" style={{ color: theme.palette.text.primary }}>Tokens</h1>
                    <div className="section">
                        <div className="stats-item">
                            <TextMeter theme={theme} number={523} min={100} mid={500} />
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
        </>
    )
}

export default App;
