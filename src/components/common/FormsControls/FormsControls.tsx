import React from "react";
import s from "./FormsControls.module.scss";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators";
import { LoginFormValuesType } from "../../Login/LoginPage";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps;
    children: React.ReactNode;
};

const FormControl: React.FC<FormControlPropsType> = ({
    meta,
    children,
    ...props
}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>{children}</div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export const Textarea: React.FC<WrappedFieldProps> = ({
    input,
    meta,
    ...props
}) => {
    return (
        <FormControl {...input} meta={meta}>
            <textarea {...input} {...props} />
        </FormControl>
    );
};

export const Input: React.FC<WrappedFieldProps> = ({
    input,
    meta,
    ...props
}) => {
    return (
        <FormControl {...input} meta={meta}>
            <input {...input} {...props} />
        </FormControl>
    );
};

export function createField<FormKeyType extends string>(
    placeholder: string | undefined,
    // name: string,
    name: FormKeyType,
    validators: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {},
    text = ""
) {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}
            />{" "}
            {text}
        </div>
    );
}
export type GetStringKeys<T> = Extract<keyof T, string>;
