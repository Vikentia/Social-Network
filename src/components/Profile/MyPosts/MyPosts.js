import React from "react";
import Post from "./Post/Post";
import './style.css';

function MyPosts(props) {

    let postData = props.posts
        .map(post => <Post message={post.message} likesCount={post.likesCount} />);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();;
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }
    return (
        <div className="myPosts">
            <h3>My posts</h3>
            <div><textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} /></div>
            <button onClick={addPost}>Add</button>
            <button>Delete</button>

            {postData}

        </div>

    );
}

export default MyPosts;