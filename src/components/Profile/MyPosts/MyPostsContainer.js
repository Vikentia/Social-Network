import React from "react";
import { addPostActionCreater, updateNewPostActionCreater } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {


  let state = props.store.getState()

  let addPost = () => {
    props.store.dispatch(addPostActionCreater());
  };

  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostActionCreater(text));
  }

  return (<MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts}
    newPostText={state.profilePage.newPostText} />);
}

export default MyPostsContainer;
