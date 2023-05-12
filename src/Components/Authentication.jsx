import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { tokens } from '../Theme';
import "./Authentication.css";
import { useEffect, useState } from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Link, useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import supabase from '../Global/Supabase';


export default function Authentication(props) {
    const theme = props.theme;
    const navigate = useNavigate();

    useEffect(() => {
        props.setFullPageLoad(true);
        supabase.auth.getSession().then(({ data }) => {
            if(data) {
                props.setShowNav(true);
                props.setSession(data.user);
                navigate("/app");
            }
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            props.setSession(session);
        })
        props.setFullPageLoad(false);
        return () => subscription.unsubscribe();
    }, []);

    return(
        <div style={{backgroundColor: theme.palette.background.default}} className="auth-container">
            <Link to="/"><div style={{backgroundColor: theme.palette.background.paper}} className="go-back"><LeftOutlined className="card-icon" style={{color: theme.palette.text.special}}/></div></Link>
            <img src="logo.svg" style={{width: 120, height: 120}} />
            <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: theme.palette.tertiary.main,
                        brandAccent: theme.palette.alert.info,
                      },
                    },
                  },
                  style: {
                    button: { color: theme.palette.background.default },
                    container: { minWidth: 250, maxWidth: 500 }
                  }
                }}
                theme='dark'
                socialLayout='horizontal'
                providers={['google', 'facebook', 'twitter']}
            />
        </div>
    )
}