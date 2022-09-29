import React, { useState, ChangeEvent } from "react";
import { Preloader } from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.scss";
import ProfileStatus from "./ProfileStatus";
import ProfileDataForm from "./ProfileDataForm";
import { ProfileContactsType, ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType | null;
    status: string;
    isOwner: boolean;
    updateStatus: (status: string) => void;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = ({
    profile,
    status,
    updateStatus,
    isOwner,
    savePhoto,
    saveProfile,
}) => {
    const [editMode, setEditMode] = useState(false);
    if (!profile) {
        return <Preloader />;
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        });
    };

    return (
        <div className={s.profileInfo}>
            <div className={s.descriptionBlock}>
                <div>
                    <img
                        src={
                            profile.photos.small ||
                            "https://binkor.ru/images/vopros/user_hover.png"
                        }
                        className={s.mainPhoto}
                    />
                </div>
                {isOwner && (
                    <input type={"file"} onChange={onMainPhotoSelected} />
                )}
                <div className={s.descriptionBlock__status}>
                    <b>Status: </b>{" "}
                    <ProfileStatus
                        status={status}
                        updateStatus={updateStatus}
                    />
                </div>
                {editMode ? (
                    <ProfileDataForm
                        initialValues={profile}
                        profile={profile}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => setEditMode(true)}
                    />
                )}
            </div>
        </div>
    );
};

type ProfileDataPropsType = {
    profile: ProfileType;
    isOwner: boolean;
    goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({
    profile,
    isOwner,
    goToEditMode,
}) => {
    return (
        <div>
            <div>{isOwner && <button onClick={goToEditMode}>Edit</button>}</div>
            <div>
                <b>Name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b>{" "}
                {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            {profile.lookingForAJob && (
                <div>
                    <b>My professional skills:</b>{" "}
                    {profile.lookingForAJobDescription}
                </div>
            )}
            <div className={s.descriptionBlock__aboutMe}>
                <b>About me:</b> {profile.aboutMe || "None"}
            </div>
            <div>
                <b>Contacts:</b>{" "}
                {Object.keys(profile.contacts).map((contact) => (
                    <Contact
                        contactTitle={contact}
                        contactValue={
                            profile.contacts[
                                contact as keyof ProfileContactsType
                            ]
                        }
                        key={contact}
                    />
                ))}
            </div>
        </div>
    );
};

type ContactPropsType = {
    contactTitle: string;
    contactValue: string;
};

const Contact: React.FC<ContactPropsType> = ({
    contactTitle,
    contactValue,
}) => {
    return (
        <div className={s.descriptionBlock__contacts}>
            <b>{contactTitle}: </b> {contactValue || "None"}
        </div>
    );
};

export default ProfileInfo;
