import React from "react";
import { Field, reduxForm } from "redux-form";
import { createField, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators';
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer';
import { Navigate } from "react-router-dom";
import s from "./Login.module.scss";

const LoginForm = ({ handleSubmit, error }) => {

    return <form onSubmit={handleSubmit}>

        {createField("Email", 'email', [required], Input)}
        {createField('Password', 'password', [required], Input, { type: 'password' })}
        {createField(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}

        {error && <div className={s.form__summaryError}>{error}</div>}
        <div><button>Login</button></div>
    </form>
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = ({ login, isAuth }) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe);
    }
    if (isAuth) {
        return <Navigate to={'/profile'} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>;
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);
