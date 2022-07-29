import React from "react";
import s from './Post.module.scss';

function Post(props) {
    return (
        <div className={s.post}>
            <img src='https://get.wallhere.com/photo/1600x1200-px-boxes-Danbo-eyes-fallen-glowing-leaves-1629619.jpg' alt='ava' />
            Post: {props.message}
            <div>
                <span> Like {props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;