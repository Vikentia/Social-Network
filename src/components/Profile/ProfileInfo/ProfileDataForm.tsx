import React from "react";
import s from "./ProfileInfo.module.scss";
import style from "../../common/FormsControls/FormsControls.module.scss";
import {
    createField,
    GetStringKeys,
    Input,
    Textarea,
} from "../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType;
};
type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<
    InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <b>Name:</b>{" "}
                {createField<ProfileTypeKeys>(
                    "full name",
                    "fullName",
                    [],
                    Input
                )}
            </div>
            <div>
                <b>Looking for a job</b>:{" "}
                {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {
                    type: "checkbox",
                })}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField<ProfileTypeKeys>(
                    "My professional skills",
                    "lookingForAJobDescription",
                    [],
                    Textarea
                )}
            </div>
            <div>
                <b>About me</b>:
                {createField<ProfileTypeKeys>(
                    "About me",
                    "aboutMe",
                    [],
                    Textarea
                )}
            </div>
            <div>
                <b>Contacts</b>:{" "}
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key} className={s.contact}>
                            <b>
                                {key}:{" "}
                                {createField(key, "contacts." + key, [], Input)}
                            </b>
                        </div>
                    );
                })}
            </div>
        </form>
    );
};
const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: "edit-profile" })(
    ProfileDataForm
);

export default ProfileDataFormReduxForm;
