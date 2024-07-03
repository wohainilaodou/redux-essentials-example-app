import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { postEdited } from './PostsSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId),
  )
  console.log(post, postId)
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postEdited({ id: postId, title: title, content: content }))
      history.push(`/posts/${postId}`)
    }
  }
  return (
    <>
      <section>
        <h2>编辑文章</h2>
        <form action="">
          <label htmlFor="postTitle">文章标题: </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="what`s on your mind?"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postContent">内容：</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </form>
        <button type="button" onClick={onSavePostClicked}>
          保存文章
        </button>
      </section>
    </>
  )
}
