import React, {useEffect, useState} from "react";
import { InputText } from 'primereact/inputtext';
import {userActions} from "../actions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

const LoginComponent = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        props.dispatch(userActions.login({
            username: username,
            password: password
        }));
    }

    return (
        localStorage.getItem("user") ?
            window.location = "/" :
            <div className={'login-div'}>
                <div className="header">
                    Isupov Denis Vasilievich<br/>
                    P32101<br/>
                    Variant: 3210112
                </div>
                <form onSubmit={login} className={'form'}>
                    <InputText maxLength={50} name={'username'} className={'username-input'} value={username} placeholder={"login"} onChange={(e) => setUsername(e.target.value)}/><br/>
                    <InputText maxLength={50} name={'password'} className={'password-input'} value={password} type={"password"} placeholder={"password"} onChange={(e) => setPassword(e.target.value)}/><br/>
                    <button className={'submit'} type={"submit"}><span>LogIn</span><i></i></button><br/>
                    <Link className={'link'} to={'/signup'}>Register</Link>
                </form>
            </div>
    )
}

const mapStateToProps = (state) => {
    const { error } = state.error;
    return {
        error
    };
}

export default connect(mapStateToProps)(LoginComponent)