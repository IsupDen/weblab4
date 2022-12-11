import React, {useEffect, useState} from "react";
import { InputText } from 'primereact/inputtext';
import {userActions} from "../actions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

const RegisterComponent = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        userActions.logout();
    }, [])

    const register = (e) => {
        e.preventDefault();
        props.dispatch(userActions.register({
            username: username,
            password: password
        }));
    }

    return (
        <div className={'register-div'}>
            <div className="header">
                Isupov Denis Vasilievich<br/>
                P32101<br/>
                Variant: 3210112
            </div>
            <form className={'form'} onSubmit={register}>
                <InputText name={'username'} className={'username-input'} value={username} placeholder={"login"} onChange={(e) => setUsername(e.target.value)}/><br/>
                <InputText name={'password'} className={'password-input'} value={password} type={"password"} placeholder={"password"} onChange={(e) => setPassword(e.target.value)}/><br/>
                <button className={'submit'} type={"submit"}><span>Register</span><i></i></button><br/>
                <Link className={'link'} to={'/signin'}>LogIn</Link>
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

export default connect(mapStateToProps)(RegisterComponent)