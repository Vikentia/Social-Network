import React from "react";
import Post from "./Post";
import './style.css';

function MyPosts() {
    return (
        <div className="myPosts">
            <h3>My posts</h3>
            <div><textarea></textarea></div>
            <button>Add</button>
            <button>Delete</button>
            <Post message={'Hello'} />
            <Post message={'Bye'} />
        </div>

    );
}

export default MyPosts;