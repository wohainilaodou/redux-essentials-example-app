import {useState} from "react";
import {useDispatch} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";
import {postAdded} from "./PostsSlice";

export const AddPostForm = ()=>{
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    const dispatch = useDispatch()
    const onTitleChanged = e=>setTitle(e.target.value)
    const onContentChanged = e=>setContent(e.target.value)
    const onSavePostClicked = ()=>{
        if(title && content)
        {
            dispatch(
                postAdded({id:nanoid,title,content})
            )
            setTitle('')
            setContent('')
        }
    }

    return (
        <section>
            <h2>添加新文章</h2>
            <form>
                <label htmlFor='postTitle'>文章标题</label>
                <input
                    type='text'
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={onTitleChanged}
                    />

                <label htmlFor='postContent'>文章内容</label>
                <input
                    type='text'
                    id='postContent'
                    name='postTitle'
                    value={content}
                    onChange={onContentChanged}
                />
                <button type='button' onClick={onSavePostClicked}>保存文章</button>
            </form>
        </section>
    )
}