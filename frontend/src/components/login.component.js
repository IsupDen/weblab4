import React from "react";
import { InputText } from 'primereact/inputtext';
import {userActions} from "../actions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);

        userActions.logout();

        this.state = {
            username: '',
            password: '',
        };
    }

    login(e) {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.dispatch(userActions.login(username, password));
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className={'login-div'}>
                <div className="header">
                    Isupov Denis Vasilievich<br/>
                    P32101<br/>
                    Variant: 3210112
                </div>
                <form onSubmit={this.login} className={'form'}>
                    <InputText name={'username'} className={'username-input'} value={username} placeholder={"login"} onChange={(e) => this.onChange(e)}/><br/>
                    <InputText name={'password'} className={'password-input'} value={password} type={"password"} placeholder={"password"} onChange={(e) => this.onChange(e)}/><br/>
                    <button className={'submit'} type={"submit"}><span>LogIn</span><i></i></button><br/>
                    <Link className={'link'} to={'/signup'}>Register</Link>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { error } = state.error;
    return {
        error
    };
}

export default connect(mapStateToProps)(LoginComponent)