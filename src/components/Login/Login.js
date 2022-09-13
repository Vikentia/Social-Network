import React from "react";
import { Field, reduxForm } from "redux-form";
import { createField, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators';
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer';
import { Navigate } from "react-router-dom";
import s from "./Login.module.scss";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {

    return <form onSubmit={handleSubmit}>

        {createField("Email", 'email', [required], Input)}
        {createField('Password', 'password', [required], Input, { type: 'password' })}
        {createField(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}
        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl && createField("Symbols from image", 'captcha', [required], Input)}
        {error && <div className={s.form__summaryError}>{error}</div>}
        <div><button>Login</button></div>
    </form>
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = ({ login, isAuth, captchaUrl }) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (isAuth) {
        return <Navigate to={'/profile'} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>;
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);
