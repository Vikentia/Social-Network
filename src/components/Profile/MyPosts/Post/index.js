import React from "react";
import './style.css';

function Post(props) {
    return (
        <div className="post">
            <img src='https://get.wallhere.com/photo/1600x1200-px-boxes-Danbo-eyes-fallen-glowing-leaves-1629619.jpg' alt='ava' />
            Post: {props.message}
            <div>
                <span> Like {props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;