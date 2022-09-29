import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.scss";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators";
import {
    Textarea,
    createField,
    GetStringKeys,
} from "../../common/FormsControls/FormsControls";
import { PostsType } from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostsType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

type AddPostFormValuesType = { newPostText: string };

const maxLength10 = maxLengthCreator(10);

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let postsElements = props.posts.map((post) => (
        <Post
            key={post.id}
            message={post.message}
            likesCount={post.likesCount}
            id={post.id}
        />
    ));

    // let newPostElement = React.createRef();

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.myPosts}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            {postsElements}
        </div>
    );
};

type AddNewPostPropsType = {};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddNewPostForm: React.FC<
    InjectedFormProps<AddPostFormValuesType, AddNewPostPropsType> &
        AddNewPostPropsType
> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<AddPostFormValuesTypeKeys>(
                "Post message",
                "newPostText",
                [required, maxLength10],
                Textarea
            )}

            <button>Add</button>
            <button>Delete</button>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm<
    AddPostFormValuesType,
    AddNewPostPropsType
>({ form: "ProfileAddNewPostForm" })(AddNewPostForm);

export default React.memo(MyPosts);
