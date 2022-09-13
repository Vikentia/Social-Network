import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.scss";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from '../../../utils/validators'
import { Textarea } from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

const MyPosts = (props) => {
  let postsElements = props.posts.map((post) => (
    <Post key={post.id} message={post.message} likesCount={post.likesCount} />
  ));

  // let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.myPosts}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      {postsElements}
    </div>
  );
}

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name={'newPostText'} validate={[required, maxLength10]} placeholder={'Post message'} />
      <button>Add</button>
      <button>Delete</button>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm)

export default React.memo(MyPosts);
