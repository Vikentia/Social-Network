import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import s from "./Login.module.scss";
import { AppStateType } from "../../redux/redux-store";

type LoginFormOwnPropsType = {
    captchaUrl: string | null;
};
export type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const LoginForm: React.FC<
    InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> &
        LoginFormOwnPropsType
> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>(
                "Email",
                "email",
                [required],
                Input
            )}
            {createField<LoginFormValuesTypeKeys>(
                "Password",
                "password",
                [required],
                Input,
                {
                    type: "password",
                }
            )}
            {createField<LoginFormValuesTypeKeys>(
                undefined,
                "rememberMe",
                [],
                Input,
                { type: "checkbox" },
                "remember me"
            )}
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl &&
                createField<LoginFormValuesTypeKeys>(
                    "Symbols from image",
                    "captcha",
                    [required],
                    Input,
                    {}
                )}
            {error && <div className={s.form__summaryError}> {error} </div>}
            <div>
                {" "}
                <button>Login </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
    form: "login",
})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
};
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({
    login,
    isAuth,
    captchaUrl,
}) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        login(
            formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha
        );
    };
    if (isAuth) {
        return <Navigate to={"/profile"} />;
    }
    return (
        <div>
            <h1>Login </h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
