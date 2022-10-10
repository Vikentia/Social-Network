import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
    createField,
    GetStringKeys,
    Input,
} from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators";
import { useDispatch, useSelector } from "react-redux";
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
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

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

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector(
        (state: AppStateType) => state.auth.captchaUrl
    );
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch<any>();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(
            login(
                formData.email,
                formData.password,
                formData.rememberMe,
                formData.captcha
            )
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

