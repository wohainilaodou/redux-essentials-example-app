import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {PostAuthor} from "../users/PostAuthor";
import {ReactionButton} from "../common/ReactionButtons";
import {TimeAgo} from "../common/TimeAgo";

export const SinglePostPage = ({match})=>{
    const {postId} = match.params;

    // 每当useSelector返回的值为新引用时,组件就会渲染,
    const post = useSelector((state)=>
        state.posts.find((post)=> post.id === postId)
    );
    console.log("SinglePost",post);
    if(!post){
        return (
            <>
                <section>
                    <h2>页面未找到!</h2>
                </section>
            </>
        )
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <PostAuthor userId={post.user}/><br/>
                <TimeAgo timestamp={post.date} />
                <ReactionButton post={post}/>
                <Link to={`/editPost/${post.id}`} className='button'>Edit Post</Link>
            </article>
        </section>
    )
}