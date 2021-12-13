import React from "react";
import Post from "./Post";
import './style.css';

function MyPosts() {
    return (
        <div className="myPosts">

            <textarea></textarea>
            <button>Add</button>
            <button>Delete</button>
            <Post message={'Hello'} />
            <Post message={'Bye'} />
        </div>

    );
}

export default MyPosts;