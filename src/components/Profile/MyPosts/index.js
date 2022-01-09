import React from "react";
import Post from "./Post";
import './style.css';

function MyPosts(props) {


    let postData = props.postsData
        .map(post => <Post message={post.message} likesCount={post.likesCount} />);
    return (
        <div className="myPosts">
            <h3>My posts</h3>
            <div><textarea></textarea></div>
            <button>Add</button>
            <button>Delete</button>
            {postData}

        </div>

    );
}

export default MyPosts;