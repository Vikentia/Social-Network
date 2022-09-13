import React from "react";
import s from './Post.module.scss';
import postImage from '../../../../assets/post.png'
import heartImage from '../../../../assets/heart.png'

function Post(props) {
    return (
        <div className={s.post}>
            <img src={postImage} alt='avator' className={s.post__messImage}/>
            Post: {props.message}
            <div>
                <span> <img src={heartImage} alt='like' className={s.post__heart}/> {props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;